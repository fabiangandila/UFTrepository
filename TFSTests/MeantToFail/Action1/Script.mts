SystemUtil.Run "C:\Program Files (x86)\Micro Focus\Unified Functional Testing\samples\Flights Application\FlightsGUI.exe"


WpfWindow("Micro Focus MyFlight Sample").WpfEdit("agentName").Set "john" @@ hightlight id_;_1963062608_;_script infofile_;_ZIP::ssf2.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfEdit("password").SetSecure "5e6948ee3d3dd08adee3" @@ hightlight id_;_1963091216_;_script infofile_;_ZIP::ssf3.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfButton("OK").Click @@ hightlight id_;_1963091456_;_script infofile_;_ZIP::ssf4.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfComboBox("fromCity").Check CheckPoint("fromCity") @@ hightlight id_;_1963093184_;_script infofile_;_ZIP::ssf5.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfComboBox("toCity").Check CheckPoint("toCity") @@ hightlight id_;_2045466640_;_script infofile_;_ZIP::ssf6.xml_;_
WpfWindow("Micro Focus MyFlight Sample").Close @@ hightlight id_;_4259890_;_script infofile_;_ZIP::ssf7.xml_;_

If not(WpfWindow("Micro Focus MyFlight Sample").Exist) Then
	Reporter.ReportEvent micFail, "Failed step", "Meant to fail"
End If
