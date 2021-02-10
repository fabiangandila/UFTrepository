SystemUtil.Run "iexplore.exe"

Browser("Browser").Navigate "https://www.google.com/" @@ hightlight id_;_131816_;_script infofile_;_ZIP::ssf1.xml_;_
Browser("Browser").Page("Google").WebEdit("Search").Set "test" @@ script infofile_;_ZIP::ssf2.xml_;_
Browser("Browser").Close
