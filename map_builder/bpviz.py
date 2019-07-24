import os
# from django.conf.settings import PROJECT_ROOT
from bokeh.plotting import figure, output_file, show

from bokeh.io import show
from bokeh.models import (
    ColumnDataSource,
    HoverTool,
    LogColorMapper
)
# from bokeh.palettes import Viridis6 as palette
from bokeh.plotting import figure

from uszipcode import SearchEngine
from random import random

from geopy.geocoders import Nominatim

CUSTOM_COLORS = {
    "Primary": "#425058",
    "Black": "#000000",
    "White": "#FFFFFF",
    "Blue": "#1DB3E7",
    "Orange": "#FBB122",
    "Gray": "#71727A",
    "Red": "#EB5A4E",
    "Teal": "#00A19A",
    "Purple": "#CD4785",
    "Green": "#65B144",
    "Dark Orange": "#F6893C",
    "Dark Blue": "#425058",
    "Neutral Blue": "#AAC9CB",
    "Tan": "#E0CAA3"
}

def create_dictionary_data(filename):
    with open(filename, 'r') as file:
        head = file.readline().split(',')
        lines = file.readlines()

    all_data = [{head[i].strip(): line.split(',')[i].strip() for i in range(len(head))}
                for line in lines]

    d = {key.strip(): [] for key in head}
    for datum in all_data:
        for key in d.keys():
            d[key].append(datum[key])

    d['lat'] = list(map(float, d['lat']))
    d['lon'] = list(map(float, d['lon']))

    return d


def open_cm_data():
    with open('.\\local\\cm_lat_lon.csv') as file:
        head = list(map(lambda s: s.strip(), file.readline().split(',')))
        lines = [list(map(lambda s: s.strip(), line.split(',')))
                 for line in file.readlines()]

    cm_data = [{head[i]: line[i] for i in range(len(head))} for line in lines]

    cm_counties = {cm['county']: {'num': 0, 'cms': 0,
                                  'state': cm['state']} for cm in cm_data}
    return cm_data, cm_counties


def build_state_plot():
    from bokeh.sampledata.us_counties import data as counties

    print('building data sets...')
    alum_points = create_dictionary_data('./local/alum_lat_lon.csv')
    cm_points = create_dictionary_data('./local/cm_lat_lon.csv')
    school_points = create_dictionary_data('./local/school_lat_lon.csv')
    supporter_points = create_dictionary_data(
        './local/supporters_lat_lon.csv')

    print('school data...')
    cm_data, cm_counties = open_cm_data()

    for cm in cm_data:
        students, county = int(cm['num']), cm['county']
        cm_counties[county]['num'] += students
        cm_counties[county]['cms'] += 1

    print('creating county info...')
    counties = {
        code: county for code, county in counties.items() if (county['state'] == 'ms' or county['state'] == 'ar')
    }
    student_numbers = []
    for code in counties.keys():
        if counties[code]['name'].replace(' County', '') in cm_counties.keys() and cm_counties.get(counties[code]['name'], {'state': ''}).get('state', '') == counties[code]['state']:
            counties[code]['students'] = cm_counties[counties[code]
                                                     ['name']].get('num', 0)
            student_numbers.append(
                cm_counties[counties[code]['name']].get('num', 0))
            counties[code]['cms'] = cm_counties[counties[code]
                                                ['name']].get('cms', 0)
        else:
            counties[code]['students'] = 0
            counties[code]['cms'] = 0
    max_students = max(student_numbers)

    print('building plot...')
    output_file('./map.html')

    county_xs = [county["lons"] for county in counties.values()]
    county_ys = [county["lats"] for county in counties.values()]

    county_names = ['{} County'.format(county['name'])
                    for county in counties.values()]
    county_place = [bool(county['students']) for county in counties.values()]
    county_students = ['{} students'.format(
        county['students']) for county in counties.values()]
    county_cms = ['{} Corps Members'.format(
        county['cms']) for county in counties.values()]

    palette = [CUSTOM_COLORS['Dark Blue'], CUSTOM_COLORS['Teal']]
    color_mapper = LogColorMapper(palette=palette)

    source = ColumnDataSource(data=dict(
        x=county_xs,
        y=county_ys,
        county=county_names,
        has_cm=county_place,
        students=county_students
    ))

    TOOLS = "pan,wheel_zoom,reset,save"

    p = figure(
        tools=TOOLS,
        active_drag="pan", active_scroll=None, active_tap=None, active_inspect=None,
        x_axis_location=None, y_axis_location=None,
        toolbar_location="left"
    )
    p.grid.grid_line_color = None
    p.sizing_mode = 'scale_width'
    # p.sizing_mode = 'scale_height'

    p.patches('x', 'y', source=source,
              fill_color={'field': 'has_cm', 'transform': color_mapper},
              fill_alpha=1, line_color="white", line_width=2)

    # school data points
    source = ColumnDataSource(dict(
        x=school_points['lon'],
        y=school_points['lat'],
        city=school_points['city'],
        name=school_points['name'],
        type=school_points['type'],
        cms=school_points['number'],
    ))
    g = p.square(x="x", y="y", source=source, size=8,
                 color=CUSTOM_COLORS['Purple'], alpha=1, legend='Schools')
    hover1 = HoverTool(renderers=[g], tooltips=[
        ("School Name", "@name"),
        ("Location", "@city"),
        ("Type of Partner", "@type"),
        ("Number of CMs", "@cms"),
    ])
    p.add_tools(hover1)

    # donor data points
    source = ColumnDataSource(dict(
        x=supporter_points['lon'],
        y=supporter_points['lat'],
        city=supporter_points['city'],
        name=supporter_points['name'],
        donate=supporter_points['last_donate'],
    ))
    g = p.circle(x="x", y="y", source=source, size=8,
                 color=CUSTOM_COLORS['Blue'], alpha=1, legend='Supporters')
    hover2 = HoverTool(renderers=[g], tooltips=[
        ("Donor Name", "@name"),
        ("Location", "@city"),
        ("Latest Donation", "@donate"),
    ])
    p.add_tools(hover2)

    # alumni data points
    source = ColumnDataSource(dict(
        x=alum_points['lon'],
        y=alum_points['lat'],
        city=alum_points['city'],
        name=alum_points['name'],
        corps=alum_points['corps'],
        title=alum_points['title'],
        employer=alum_points['employer'],
        profession=alum_points['profession'],
        last_survey=alum_points['last_survey'],
        nps=alum_points['nps'],
    ))
    g = p.circle(x="x", y="y", source=source, size=8,
                 color=CUSTOM_COLORS['Red'], alpha=1, legend='Alumni')
    hover3 = HoverTool(renderers=[g], tooltips=[
        ("Alum Name", "@name"),
        ("Corps", "@corps"),
        ("Location", "@city"),
        ("Title", "@title"),
        ("Employer", "@employer"),
        ("profession", "@profession"),
        ("Last Alum Survey", "@last_survey"),
        ("Latest NPS", "@nps"),
    ])
    p.add_tools(hover3)

    # cm data points
    source = ColumnDataSource(dict(
        x=cm_points['lon'],
        y=cm_points['lat'],
        city=cm_points['city'],
        name=cm_points['name'],
        school=cm_points['school'],
        coach=cm_points['coach'],
        content=cm_points['content'],
        num=cm_points['num'],
        yol=cm_points['yol'],
    ))
    g = p.circle(x="x", y="y", source=source, size=8,
                 color=CUSTOM_COLORS['Orange'], alpha=1, legend='Corps Members')
    hover4 = HoverTool(renderers=[g], tooltips=[
        ("CM Name", "@name"),
        ("Location", "@city"),
        ("School", "@school"),
        ("Coach", "@coach"),
        ("Content", "@content"),
        ("Number of Students", "@num"),
        ("Expected Growth", "@yol"),
    ])
    p.add_tools(hover4)

    p.legend.location = "top_right"
    p.legend.click_policy = "hide"

    p.toolbar.active_inspect = [hover2, hover3, hover4]
    # p.toolbar.active_inspect = []

    show(p)


def main():
    build_state_plot()
    print('...html compiled')
    print('browser opening')


if __name__ == '__main__':
    main()
