SystemUtil.Run "C:\Program Files (x86)\Micro Focus\Unified Functional Testing\samples\Flights Application\FlightsGUI.exe"

If WpfWindow("Micro Focus MyFlight Sample").Exist Then
	Reporter.ReportEvent micDone, "App has been launched", "Passed"
End If


 WpfWindow("Micro Focus MyFlight Sample").Minimize @@ hightlight id_;_1180420_;_script infofile_;_ZIP::ssf30.xml_;_
 
 If not(WpfWindow("Micro Focus MyFlight Sample").Exist) Then
	Reporter.ReportEvent micDone, "App is minimized", "Passed"
Else
	Reporter.ReportEvent micFail, "App is not minimized", "Failed"
End If

  WpfWindow("Micro Focus MyFlight Sample").Restore
  
WpfWindow("Micro Focus MyFlight Sample").WpfEdit("agentName").Check CheckPoint("agentName")
WpfWindow("Micro Focus MyFlight Sample").Check CheckPoint("Micro Focus MyFlight Sample")
WpfWindow("Micro Focus MyFlight Sample").WpfEdit("agentName").Set "john" @@ hightlight id_;_1989713616_;_script infofile_;_ZIP::ssf47.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfEdit("password").Check CheckPoint("password")
WpfWindow("Micro Focus MyFlight Sample").WpfEdit("password").SetSecure "5fabbf8e394f9cb249f5" @@ hightlight id_;_1989723216_;_script infofile_;_ZIP::ssf53.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfButton("OK").Click @@ hightlight id_;_1989726432_;_script infofile_;_ZIP::ssf52.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfButton("OK").Check CheckPoint("OK")
WpfWindow("Micro Focus MyFlight Sample").WpfTabStrip("WpfTabStrip").Select "SEARCH ORDER" @@ hightlight id_;_1988529576_;_script infofile_;_ZIP::ssf54.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfTabStrip("WpfTabStrip").Select "BOOK FLIGHT" @@ hightlight id_;_1988529576_;_script infofile_;_ZIP::ssf55.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfComboBox("toCity").Select "Seattle" @@ hightlight id_;_1989689904_;_script infofile_;_ZIP::ssf59.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfImage("WpfImage").Click 9,10 @@ hightlight id_;_1989690864_;_script infofile_;_ZIP::ssf60.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfCalendar("Su").SetDate "5-Dec-2020" @@ hightlight id_;_1989692976_;_script infofile_;_ZIP::ssf61.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfComboBox("Class").Check CheckPoint("Class")
WpfWindow("Micro Focus MyFlight Sample").WpfComboBox("Class").Select "First" @@ hightlight id_;_1989694512_;_script infofile_;_ZIP::ssf71.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfComboBox("Class").Check CheckPoint("Class_2")
WpfWindow("Micro Focus MyFlight Sample").WpfComboBox("Class").Select "Business" @@ hightlight id_;_1989694512_;_script infofile_;_ZIP::ssf73.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfComboBox("numOfTickets").Check CheckPoint("numOfTickets")
WpfWindow("Micro Focus MyFlight Sample").WpfComboBox("numOfTickets").Select "13" @@ hightlight id_;_1989695760_;_script infofile_;_ZIP::ssf77.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfComboBox("numOfTickets").Check CheckPoint("numOfTickets_2")
WpfWindow("Micro Focus MyFlight Sample").WpfComboBox("numOfTickets").Select "1" @@ hightlight id_;_1989695760_;_script infofile_;_ZIP::ssf84.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfObject("London to Paris,  all").Click 130,63 @@ hightlight id_;_1991422624_;_script infofile_;_ZIP::ssf85.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfButton("FIND FLIGHTS").Check CheckPoint("FIND FLIGHTS")
WpfWindow("Micro Focus MyFlight Sample").WpfButton("FIND FLIGHTS").Click @@ hightlight id_;_1988555160_;_script infofile_;_ZIP::ssf86.xml_;_
WpfWindow("Micro Focus MyFlight Sample").Dialog("Error").WinButton("OK").Click @@ hightlight id_;_330934_;_script infofile_;_ZIP::ssf87.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfButton("FIND FLIGHTS").Click @@ hightlight id_;_1988555160_;_script infofile_;_ZIP::ssf88.xml_;_
WpfWindow("Micro Focus MyFlight Sample").Dialog("Error").WinButton("OK").Click @@ hightlight id_;_396470_;_script infofile_;_ZIP::ssf89.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfImage("WpfImage").Click 15,7 @@ hightlight id_;_1989690864_;_script infofile_;_ZIP::ssf90.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfCalendar("Su").SetDate "31-Oct-2020" @@ hightlight id_;_1989692976_;_script infofile_;_ZIP::ssf92.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfImage("WpfImage").Click 8,7 @@ hightlight id_;_1989690864_;_script infofile_;_ZIP::ssf93.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfCalendar("Su").SetDate "23-Dec-2020" @@ hightlight id_;_1989692976_;_script infofile_;_ZIP::ssf96.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfButton("FIND FLIGHTS").Click @@ hightlight id_;_1988555160_;_script infofile_;_ZIP::ssf97.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfTable("flightsDataGrid").SelectCell 0,0 @@ hightlight id_;_1988523528_;_script infofile_;_ZIP::ssf98.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfTable("flightsDataGrid").SelectCell 1,0 @@ hightlight id_;_1988523528_;_script infofile_;_ZIP::ssf99.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfTable("flightsDataGrid").SelectCell 2,0 @@ hightlight id_;_1988523528_;_script infofile_;_ZIP::ssf100.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfTable("flightsDataGrid").SelectCell 4,0 @@ hightlight id_;_1988523528_;_script infofile_;_ZIP::ssf101.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfTable("flightsDataGrid").Check CheckPoint("flightsDataGrid")
WpfWindow("Micro Focus MyFlight Sample").WpfTable("flightsDataGrid").SelectCell 0,0 @@ hightlight id_;_1988523528_;_script infofile_;_ZIP::ssf102.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfTable("flightsDataGrid").SelectCell 4,0 @@ hightlight id_;_1988523528_;_script infofile_;_ZIP::ssf103.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfButton("SELECT FLIGHT").Click @@ hightlight id_;_1988526168_;_script infofile_;_ZIP::ssf104.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfEdit("passengerName").Set "my name " @@ hightlight id_;_1988526504_;_script infofile_;_ZIP::ssf106.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfButton("ORDER").Click @@ hightlight id_;_1988535144_;_script infofile_;_ZIP::ssf107.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfButton("NEW SEARCH").Check CheckPoint("NEW SEARCH")
WpfWindow("Micro Focus MyFlight Sample").WpfButton("NEW SEARCH").Click @@ hightlight id_;_1989697968_;_script infofile_;_ZIP::ssf108.xml_;_


WpfWindow("Micro Focus MyFlight Sample").Close @@ hightlight id_;_0_;_script infofile_;_ZIP::ssf110.xml_;_
