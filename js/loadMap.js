(function () {
    var fn = function () {
        Bokeh.safely(function () {
            (function (root) {
                function embed_document(root) {
                    var render_items = [{
                        "docid": "f2f57082-6376-43db-9523-24f954bc935a",
                        "elementid": "innerMap",
                        "modelid": "951dbb16-155d-42cc-94d7-cb6d9c5614d2"
                    }];
                    root.Bokeh.embed.embed_items(docs_json, render_items);

                }
                if (root.Bokeh !== undefined) {
                    embed_document(root);
                } else {
                    var attempts = 0;
                    var timer = setInterval(function (root) {
                        if (root.Bokeh !== undefined) {
                            embed_document(root);
                            clearInterval(timer);
                        }
                        attempts++;
                        if (attempts > 100) {
                            console.log("Bokeh: ERROR: Unable to run BokehJS code because BokehJS library is missing")
                            clearInterval(timer);
                        }
                    }, 10, root)
                }
            })(window);
        });
    };
    if (document.readyState != "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
})();