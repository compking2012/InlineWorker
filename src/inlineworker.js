(function(W) {
    var YY = {};
    var InlineWorker = function() {
        var functionBodyRegx, URL, contentType, code, url, worker;
        
        functionBodyRegx = /^[^{]+\{([\s\S]*)\}$/;
        URL = window.URL || window.webkitURL;
        contentType = {
            type: "text/javascript; charset=utf-8"
        };
        
        return function(func, complete, error) {
		        
            code = func.toString().match(functionBodyRegx)[1];
            
            url = window.opera ? 
                "data:application/javascript," + encodeURIComponent( code ) : 
                URL.createObjectURL(new Blob([code], contentType));
    
            worker = new Worker(url);
            
            worker.addEventListener("message", function(e) {
    		        complete.call(this, e.data);
            });
            
            worker.addEventListener("error", function(e) {
                complete.call(this, e.data);
            });
            return worker;
        };
    }();

    // Add to YY namespace
    YY.InlineWorker = InlineWorker;

    // Exports to global namespace
    W.YY = YY;
})(this);