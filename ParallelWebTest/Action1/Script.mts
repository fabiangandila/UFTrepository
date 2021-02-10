Browser("Browser").Navigate "https://www.google.com/" @@ hightlight id_;_590632_;_script infofile_;_ZIP::ssf1.xml_;_
Browser("Browser").Page("Google").WebEdit("Search").Set "test" @@ script infofile_;_ZIP::ssf2.xml_;_
Browser("Browser").Page("Google").WebElement("lga").Click @@ script infofile_;_ZIP::ssf3.xml_;_
Browser("Browser").Page("Google").WebButton("Google Search").Click @@ script infofile_;_ZIP::ssf4.xml_;_
Browser("Browser").Close
