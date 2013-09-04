 function printCheck() {
            debugger;
            var printCommand = '<object id="PrintCommandObject" name="printObject" WIDTH=0 HEIGHT=0 CLASSID="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2"></object>';
            var scriptChrome = "<script language='javascript1.2' > function printChrome(){debugger;var p=window.document.getElementById(\"framePDF\") ;";
            scriptChrome += "  p.contentWindow.print();} <\/script>";
            var scriptIe = "<script language='javascript1.2' > function printIe(){debugger;var p=window.document.getElementById(\"framePDF\") ;";
            scriptIe += " p.setActive(); 	p.print(); } <\/script>";  //scriptIe += " p.contentWindow.focus(); p.contentWindow.print(); p.contentWindow.close(); window.print(); } <\/script>";

            var printIe = '<link rel=\"alternate\" media=\"print\"  type="application/pdf" href=\"@Url.Content("~/Content/file.pdf")\" \/>';  //'<link rel=\"alternate\" media=\"print\"  type="application/pdf" href=\"~/Content/file.pdf\" \/>';
            var pageStyleIe = "<style type=\"text\/css\"   media=\"print\">\n<!-- #mainTab{display:none;} \n #mainToolbar{display:none;}    \n ";
			pageStyleIe += "  #menubilling{display:none;} \n #printReady{display:block;} \n  --><\/style>\n \n";

            var pageStyle = "<style type=\"text\/css\"><!--@@page {  margin: 0cm }--><\/style>\n";
            var style = "<style type=\"text\/css\"> #framePDF {border-width: 0px; position:absolute;top:0px;left:0px;  overflow:hidden; width:100%;height:100%;z-index: 50}<\/style>";
            

            var html = '<!DOCTYPE html>\n<html>\n<head>\n'; 
            var headTags = document.getElementsByTagName("head"); 
            if (headTags.length > 0) html += headTags[0].innerHTML;
            
            html += '\n ' + style+'\n '+pageStyle+'\n '+scriptChrome+'\n ';
            
//            if (navigator.appName == "Microsoft Internet Explorer") {
//                html += printIe+'\n '+  pageStyleIe+'\n '+scriptIe+'\n ';
//            }

            html += '\n</head>\n<';
            
            if(navigator.userAgent.indexOf('Chrome') !=-1){
                html += 'body onLoad="javascript: window.setTimeout(function(){printChrome()} , 3000);">\n';
            }
             if(navigator.userAgent.indexOf('Firefox') !=-1){
                html += 'body onLoad="javascript: window.setTimeout(function(){window.print()} , 3000);">\n';
            }
             if (navigator.appName == "Microsoft Internet Explorer") {
                 html += 'body>\n';
             }

            html += '<iframe src="@Url.Content("~/ControlChecks/ShowPrintCheckReport")" name = "framePDF"  id="framePDF" type="application/pdf" scrolling="auto" frameborder="no" width="100%" height="100%" style="margin:0 0px 0 0;"></iframe>';
            
            html += ' \n  </body>\n</html>'; 
            var printWin = document.getElementById("printFrame").contentWindow; 
            printWin.document.write(html); 
            printWin.document.close();
            

           //   Object para imprimir en Iexplorer
            
            if(navigator.appName == "Microsoft Internet Explorer"){
                var printCommandObject = null;
                printCommandObject = '<object data="@Url.Content("~/Content/file.pdf")" name = "framePDF"  id="framePDF" type="application/pdf"  width="0" height="0" ></object>';
                document.body.insertAdjacentHTML('beforeEnd', printCommandObject);
                var p=window.document.getElementById("framePDF");
                p.focus();
                //p.setActive(); 	
                //p.print();
                window.setTimeout(function(){ p.print(); } , 3000);
               }              

          // Imprimir sin dialogo de impresora en explorer
//            if(navigator.appName == "Microsoft Internet Explorer"){
//                var PrintCommandObject = null;
//                printCommand = '<object ID="printCommandObject" WIDTH=0 HEIGHT=0 CLASSID="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2"></object>';
//                document.body.insertAdjacentHTML('beforeEnd', printCommand);
//                printCommandObject.ExecWB(6, 1);
//                PrintCommandObject.outerHTML = "";
//            }   
        
        }
