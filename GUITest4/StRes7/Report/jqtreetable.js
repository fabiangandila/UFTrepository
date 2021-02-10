/* 
Copyright: Paul Hanlon

Released under the MIT/BSD licence which means you can do anything you want 
with it, as long as you keep this copyright notice on the page 
*/
(function(jq){
  jq.fn.jqTreeTable=function(map, options){
    var opts = jq.extend({openImg:"",shutImg:"",leafImg:"",lastOpenImg:"",lastShutImg:"",lastLeafImg:"",vertLineImg:"",blankImg:"",collapse:false,column:0,striped:false,highlight:false,state:true},options),
    mapa=[],mapb=[],tid=this.attr("id"),collarr=[],
	  stripe=function(){
      if(opts.striped){
  		  $("#"+tid+" tr:visible").filter(":even").addClass("even").end().filter(":odd").removeClass("even");
      }
	  },
    buildText = function(parno, preStr){//Recursively build up the text for the images that make it work
      var mp=mapa[parno], ro=0, pre="", pref, img;
      for (var y=0,yl=mp.length;y<yl;y++){
        ro = mp[y];
        if (mapa[ro]){//It's a parent as well. Build it's string and move on to it's children
          pre=(y==yl-1)? opts.blankImg: opts.vertLineImg;
          img=(y==yl-1)? opts.lastOpenImg: opts.openImg;
          mapb[ro-1] = preStr + '<img src="'+img+'" class="parimg" id="'+tid+ro+'">';
          pref = preStr + '<img src="'+pre+'" class="preimg">';
          arguments.callee(ro, pref);
        }else{//it's a child
          img = (y==yl-1)? opts.lastLeafImg: opts.leafImg;//It's the last child, It's child will have a blank field behind it
          mapb[ro-1] = preStr + '<img src="'+img+'" class="ttimage" id="'+tid+ro+'">';
        }
      }
    },
    expandKids = function(num, last){//Expands immediate children, and their uncollapsed children
      jq("#"+tid+num).attr("src", (last)? opts.lastOpenImg: opts.openImg);//
      for (var x=0, xl=mapa[num].length;x<xl;x++){
        var mnx = mapa[num][x];
        jq("#"+tid+mnx).parents("tr").removeClass("collapsed");
  			if (mapa[mnx] && opts.state && jq.inArray(mnx, collarr)<0){////If it is a parent and its number is not in the collapsed array
          arguments.callee(mnx,(x==xl-1));//Expand it. More intuitive way of displaying the tree
        }
      }
    },
    collapseKids = function(num, last){//Recursively collapses all children and their children and change icon
      jq("#"+tid+num).attr("src", (last)? opts.lastShutImg: opts.shutImg);
      for (var x=0, xl=mapa[num].length;x<xl;x++){
        var mnx = mapa[num][x];
        jq("#"+tid+mnx).parents("tr").addClass("collapsed");
        if (mapa[mnx]){//If it is a parent
          arguments.callee(mnx,(x==xl-1));
        }
      }
    },
  	creset = function(num, exp){//Resets the collapse array
  		var o = (exp)? collarr.splice(jq.inArray(num, collarr), 1): collarr.push(num);
      cset(tid,collarr);
  	},
  	cget = function(n){
	  	var v='',c=' '+document.cookie+';',s=c.indexOf(' '+n+'=');
	    if (s>=0) {
	    	s+=n.length+2;
	      v=(c.substring(s,c.indexOf(';',s))).split("|");
	    }
	    return v||0;
  	},
    cset = function (n,v) {
  		jq.unique(v);
	  	document.cookie = n+"="+v.join("|")+";";
	  };
    for (var x=0,xl=map.length; x<xl;x++){//From map of parents, get map of kids
      num = map[x];
      if (!mapa[num]){
        mapa[num]=[];
      }
      mapa[num].push(x+1);
    }
    buildText(0,"");
    jq("tr", this).each(function(i){//Inject the images into the column to make it work
      jq(this).children("td").eq(opts.column).prepend(mapb[i]);
      
    });
		collarr = cget(tid)||opts.collapse||collarr;
		if (collarr.length){
			cset(tid,collarr);
	    for (var y=0,yl=collarr.length;y<yl;y++){
	      collapseKids(collarr[y],($("#"+collarr[y]+ " .parimg").attr("src")==opts.lastOpenImg));
	    }
		}
    stripe();
    jq(".parimg", this).each(function(i){
      var jqt = jq(this),last;
      jqt.click(function(){
        var num = parseInt(jqt.attr("id").substr(tid.length));//Number of the row
        if (jqt.parents("tr").next().is(".collapsed")){//If the table row directly below is collapsed
          expandKids(num, (jqt.attr("src")==opts.lastShutImg));//Then expand all children not in collarr
					if(opts.state){creset(num,true);}//If state is set, store in cookie
        }else{//Collapse all and set image to opts.shutImg or opts.lastShutImg on parents
          collapseKids(num, (jqt.attr("src")==opts.lastOpenImg));
					if(opts.state){creset(num,false);}//If state is set, store in cookie
        }
        stripe();//Restripe the rows
      });
    });
    if (opts.highlight){//This is where it highlights the rows
      jq("tr", this).hover(
        function(){jq(this).addClass("over");},
        function(){jq(this).removeClass("over");}
      );
    };
  };
  return this;
})(jQuery);

// SIG // Begin signature block
// SIG // MIIdFAYJKoZIhvcNAQcCoIIdBTCCHQECAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // MqtnW6RLrOSGDtOQJDHk21B4zyGIse0tnkmjewFfRKWg
// SIG // ggtpMIIFbDCCBFSgAwIBAgIRAKh1UvVEyZ+hluYBHTOV
// SIG // xU0wDQYJKoZIhvcNAQELBQAwfDELMAkGA1UEBhMCR0Ix
// SIG // GzAZBgNVBAgTEkdyZWF0ZXIgTWFuY2hlc3RlcjEQMA4G
// SIG // A1UEBxMHU2FsZm9yZDEYMBYGA1UEChMPU2VjdGlnbyBM
// SIG // aW1pdGVkMSQwIgYDVQQDExtTZWN0aWdvIFJTQSBDb2Rl
// SIG // IFNpZ25pbmcgQ0EwHhcNMTkwNDA5MDAwMDAwWhcNMjAw
// SIG // NDA4MjM1OTU5WjCBtjELMAkGA1UEBhMCR0IxETAPBgNV
// SIG // BBEMCFJHMTQgMVFOMRIwEAYDVQQIDAlCZXJrc2hpcmUx
// SIG // EDAOBgNVBAcMB05ld2J1cnkxJjAkBgNVBAkMHVRoZSBM
// SIG // YXduLCAyMi0zMCBPbGQgQmF0aCBSb2FkMSIwIAYDVQQK
// SIG // DBlNaWNybyBGb2N1cyBHcm91cCBMaW1pdGVkMSIwIAYD
// SIG // VQQDDBlNaWNybyBGb2N1cyBHcm91cCBMaW1pdGVkMIIB
// SIG // IjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsLV9
// SIG // cmRmLPSR/tntkEW5tiYsLQsCYJEnY+aoSAak8R6k+q39
// SIG // shXy4COKx2yAFENHKnjunT6ebDdc+uVexBVkj66c5A5g
// SIG // LjUvEu608ZjKzQwnDQJGFkomFFdYlf8/8LsFpkDZNMg5
// SIG // xbcmrwXEHLrVmSLgXFmearg2xzusHxp6Q9uU4L//kPmj
// SIG // K30jxEcYHmhde5HXTrkjxeUvJX3FzgtYebEfVCcJa+Fi
// SIG // mzRYPVfapFILgyv6FA6ZNJamEYf9KzG3cSdNT0kQgqu6
// SIG // 9j2h9zg0jeUaY/aiYHK+YHY+/5HtIGBNB8IKduOW9dJg
// SIG // BNDkR59+HBgLBsKiroht2K/5FHGQLQIDAQABo4IBrDCC
// SIG // AagwHwYDVR0jBBgwFoAUDuE6qFM6MdWKvsG7rWcaA4Wt
// SIG // NA4wHQYDVR0OBBYEFH5MDtmDr6g/F8LVbGMF+51yVK7+
// SIG // MA4GA1UdDwEB/wQEAwIHgDAMBgNVHRMBAf8EAjAAMBMG
// SIG // A1UdJQQMMAoGCCsGAQUFBwMDMBEGCWCGSAGG+EIBAQQE
// SIG // AwIEEDBABgNVHSAEOTA3MDUGDCsGAQQBsjEBAgEDAjAl
// SIG // MCMGCCsGAQUFBwIBFhdodHRwczovL3NlY3RpZ28uY29t
// SIG // L0NQUzBDBgNVHR8EPDA6MDigNqA0hjJodHRwOi8vY3Js
// SIG // LnNlY3RpZ28uY29tL1NlY3RpZ29SU0FDb2RlU2lnbmlu
// SIG // Z0NBLmNybDBzBggrBgEFBQcBAQRnMGUwPgYIKwYBBQUH
// SIG // MAKGMmh0dHA6Ly9jcnQuc2VjdGlnby5jb20vU2VjdGln
// SIG // b1JTQUNvZGVTaWduaW5nQ0EuY3J0MCMGCCsGAQUFBzAB
// SIG // hhdodHRwOi8vb2NzcC5zZWN0aWdvLmNvbTAkBgNVHREE
// SIG // HTAbgRlvdmFkLnR6aW9uQG1pY3JvZm9jdXMuY29tMA0G
// SIG // CSqGSIb3DQEBCwUAA4IBAQA2X8W52EbDZEqNC3zbg70I
// SIG // W/OrguRIqVho+CpMSmOYYAPPAvFK+k8Uvu/dQ20QSsRS
// SIG // 1BDpC18j4aYtDG2dKjm0ow0W/nUioFrX26gmcRWVJ8ns
// SIG // BFcgxeWjyr9g8uTo/T2bUvyuomw8u01dj9mHM+e8EHN6
// SIG // Yda1RauWkURexTrC8h2SJZVfioaP+08tZ4/UCbzcy7FY
// SIG // quHrMci5uOpAsMMNLmDIT6bMjleowoaPd6CM17RI+Dru
// SIG // EMhyhG/izcBjTUS9d7RwNHhytDvkDpKAKyz3vIE34kFp
// SIG // xb2hb6+P2A4xMSWY2j84I6P/G/54+iLfnS0bNl2P9Sig
// SIG // 8tMHYR5ZCgHrMIIF9TCCA92gAwIBAgIQHaJIMG+bJhjQ
// SIG // guCWfTPTajANBgkqhkiG9w0BAQwFADCBiDELMAkGA1UE
// SIG // BhMCVVMxEzARBgNVBAgTCk5ldyBKZXJzZXkxFDASBgNV
// SIG // BAcTC0plcnNleSBDaXR5MR4wHAYDVQQKExVUaGUgVVNF
// SIG // UlRSVVNUIE5ldHdvcmsxLjAsBgNVBAMTJVVTRVJUcnVz
// SIG // dCBSU0EgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkwHhcN
// SIG // MTgxMTAyMDAwMDAwWhcNMzAxMjMxMjM1OTU5WjB8MQsw
// SIG // CQYDVQQGEwJHQjEbMBkGA1UECBMSR3JlYXRlciBNYW5j
// SIG // aGVzdGVyMRAwDgYDVQQHEwdTYWxmb3JkMRgwFgYDVQQK
// SIG // Ew9TZWN0aWdvIExpbWl0ZWQxJDAiBgNVBAMTG1NlY3Rp
// SIG // Z28gUlNBIENvZGUgU2lnbmluZyBDQTCCASIwDQYJKoZI
// SIG // hvcNAQEBBQADggEPADCCAQoCggEBAIYijTKFehifSfCW
// SIG // L2MIHi3cfJ8Uz+MmtiVmKUCGVEZ0MWLFEO2yhyemmcuV
// SIG // MMBW9aR1xqkOUGKlUZEQauBLYq798PgYrKf/7i4zIPoM
// SIG // GYmobHutAMNhodxpZW0fbieW15dRhqb0J+V8aouVHltg
// SIG // 1X7XFpKcAC9o95ftanK+ODtj3o+/bkxBXRIgCFnoOc2P
// SIG // 0tbPBrRXBbZOoT5Xax+YvMRi1hsLjcdmG0qfnYHEckC1
// SIG // 4l/vC0X/o84Xpi1VsLewvFRqnbyNVlPG8Lp5UEks9wO5
// SIG // /i9lNfIi6iwHr0bZ+UYc3Ix8cSjz/qfGFN1VkW6KEQ3f
// SIG // BiSVfQ+noXw62oY1YdMCAwEAAaOCAWQwggFgMB8GA1Ud
// SIG // IwQYMBaAFFN5v1qqK0rPVIDh2JvAnfKyA2bLMB0GA1Ud
// SIG // DgQWBBQO4TqoUzox1Yq+wbutZxoDha00DjAOBgNVHQ8B
// SIG // Af8EBAMCAYYwEgYDVR0TAQH/BAgwBgEB/wIBADAdBgNV
// SIG // HSUEFjAUBggrBgEFBQcDAwYIKwYBBQUHAwgwEQYDVR0g
// SIG // BAowCDAGBgRVHSAAMFAGA1UdHwRJMEcwRaBDoEGGP2h0
// SIG // dHA6Ly9jcmwudXNlcnRydXN0LmNvbS9VU0VSVHJ1c3RS
// SIG // U0FDZXJ0aWZpY2F0aW9uQXV0aG9yaXR5LmNybDB2Bggr
// SIG // BgEFBQcBAQRqMGgwPwYIKwYBBQUHMAKGM2h0dHA6Ly9j
// SIG // cnQudXNlcnRydXN0LmNvbS9VU0VSVHJ1c3RSU0FBZGRU
// SIG // cnVzdENBLmNydDAlBggrBgEFBQcwAYYZaHR0cDovL29j
// SIG // c3AudXNlcnRydXN0LmNvbTANBgkqhkiG9w0BAQwFAAOC
// SIG // AgEATWNQ7Uc0SmGk295qKoyb8QAAHh1iezrXMsL2s+Bj
// SIG // s/thAIiaG20QBwRPvrjqiXgi6w9G7PNGXkBGiRL0C3da
// SIG // nCpBOvzW9Ovn9xWVM8Ohgyi33i/klPeFM4MtSkBIv5rC
// SIG // T0qxjyT0s4E307dksKYjalloUkJf/wTr4XRleQj1qZPe
// SIG // a3FAmZa6ePG5yOLDCBaxq2NayBWAbXReSnV+pbjDbLXP
// SIG // 30p5h1zHQE1jNfYw08+1Cg4LBH+gS667o6XQhACTPlNd
// SIG // NKUANWlsvp8gJRANGftQkGG+OY96jk32nw4e/gdREmaD
// SIG // JhlIlc5KycF/8zoFm/lv34h/wCOe0h5DekUxwZxNqfBZ
// SIG // slkZ6GqNKQQCd3xLS81wvjqyVVp4Pry7bwMQJXcVNIr5
// SIG // NsxDkuS6T/FikyglVyn7URnHoSVAaoRXxrKdsbwcCtp8
// SIG // Z359LukoTBh+xHsxQXGaSynsCz1XUNLK3f2eBVHlRHjd
// SIG // Ad6xdZgNVCT98E7j4viDvXK6yz067vBeF5Jobchh+abx
// SIG // KgoLpbn0nu6YMgWFnuv5gynTxix9vTp3Los3QqBqgu07
// SIG // SqqUEKThDfgXxbZaeTMYkuO1dfih6Y4KJR7kHvGfWocj
// SIG // /5+kUZ77OYARzdu1xKeogG/lU9Tg46LC0lsa+jImLWpX
// SIG // cBw8pFguo/NbSwfcMlnzh6cabVgxghEDMIIQ/wIBATCB
// SIG // kTB8MQswCQYDVQQGEwJHQjEbMBkGA1UECBMSR3JlYXRl
// SIG // ciBNYW5jaGVzdGVyMRAwDgYDVQQHEwdTYWxmb3JkMRgw
// SIG // FgYDVQQKEw9TZWN0aWdvIExpbWl0ZWQxJDAiBgNVBAMT
// SIG // G1NlY3RpZ28gUlNBIENvZGUgU2lnbmluZyBDQQIRAKh1
// SIG // UvVEyZ+hluYBHTOVxU0wDQYJYIZIAWUDBAIBBQCgfDAQ
// SIG // BgorBgEEAYI3AgEMMQIwADAZBgkqhkiG9w0BCQMxDAYK
// SIG // KwYBBAGCNwIBBDAcBgorBgEEAYI3AgELMQ4wDAYKKwYB
// SIG // BAGCNwIBFTAvBgkqhkiG9w0BCQQxIgQglNkeJsCwYKPK
// SIG // ILpCMjjd5fo6tr6fCypRg0SaBGJxvvUwDQYJKoZIhvcN
// SIG // AQEBBQAEggEAf/w2Z8ggYYuvzg8etSIC3a+/X8rNQSUB
// SIG // XSyUNa/DTTQP0uTek40mwRijwwdudrRTITPJIi46ENdO
// SIG // PXY3/wlHGV39U7pAX60DQ0aKaO3vfRFCR2Dp39j9H9i2
// SIG // cCOyU/x+AukNbxA3OMAmBIJgPLTL964LOhw/e5Jgax/R
// SIG // lvmgGCSAuO+JtSpZhWHnXXJgLupdDBz1H9PQq9frjVz0
// SIG // qHUQsvdBalx64woY24Lpz3GT8VavV2oMBDJ+X6smVbQx
// SIG // nhcZxOkmd+smwanHx2QkqKE4IYDN8LMukYlsoXiLOLFF
// SIG // 7VG7nTVvXDI69ARknyBx+Y3vHEAR7365u4BBDTqzy0/B
// SIG // wqGCDsQwgg7ABgorBgEEAYI3AwMBMYIOsDCCDqwGCSqG
// SIG // SIb3DQEHAqCCDp0wgg6ZAgEDMQ8wDQYJYIZIAWUDBAIB
// SIG // BQAwgfIGCyqGSIb3DQEJEAEEoIHiBIHfMIHcAgEBBglg
// SIG // hkiG+mwKAwUwMTANBglghkgBZQMEAgEFAAQgfCi93isP
// SIG // elaKZ/zy24rPruSMzShNDiSZnj/YE3iyLL0CBl5W6haO
// SIG // 2RgTMjAyMDAzMTUyMzMzNTEuNzk3WjAEgAIB9KB2pHQw
// SIG // cjELMAkGA1UEBhMCQ0ExEDAOBgNVBAgTB09udGFyaW8x
// SIG // DzANBgNVBAcTBk90dGF3YTEWMBQGA1UEChMNRW50cnVz
// SIG // dCwgSW5jLjEoMCYGA1UEAxMfRW50cnVzdCBUaW1lIFN0
// SIG // YW1waW5nIEF1dGhvcml0eaCCCiQwggUJMIID8aADAgEC
// SIG // AhEAq91nZfJa71AAAAAAVZHpDDANBgkqhkiG9w0BAQsF
// SIG // ADCBsjELMAkGA1UEBhMCVVMxFjAUBgNVBAoTDUVudHJ1
// SIG // c3QsIEluYy4xKDAmBgNVBAsTH1NlZSB3d3cuZW50cnVz
// SIG // dC5uZXQvbGVnYWwtdGVybXMxOTA3BgNVBAsTMChjKSAy
// SIG // MDE1IEVudHJ1c3QsIEluYy4gLSBmb3IgYXV0aG9yaXpl
// SIG // ZCB1c2Ugb25seTEmMCQGA1UEAxMdRW50cnVzdCBUaW1l
// SIG // c3RhbXBpbmcgQ0EgLSBUUzEwHhcNMTgxMDA1MjAzMDI3
// SIG // WhcNMzAwMTA1MjEwMDI3WjByMQswCQYDVQQGEwJDQTEQ
// SIG // MA4GA1UECBMHT250YXJpbzEPMA0GA1UEBxMGT3R0YXdh
// SIG // MRYwFAYDVQQKEw1FbnRydXN0LCBJbmMuMSgwJgYDVQQD
// SIG // Ex9FbnRydXN0IFRpbWUgU3RhbXBpbmcgQXV0aG9yaXR5
// SIG // MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA
// SIG // q72ujI9Cy5VZXGIn+UC4/1WiQEpl/9vtp6GIbkAaLtlr
// SIG // 1UrtAVliVMRzFqPWhG7ugELqVQiYcBk/Jp7E1qao66up
// SIG // JD0LV1hk/PDaGDLZsde6cwFLDpEx771ImonDguIJePOi
// SIG // Gy6NzQ7vibN6uvIcmDOlcPh7TuwSCOyzn0+MS77XfIBn
// SIG // Vv5cPgfahqIpQBswyo/NF0mi1OvNXlByGRlwRyudCuCA
// SIG // wykHASUkXM32BtQdEYbKNfYUpL+vbkGDKWuSf0SHjNuE
// SIG // UKCRvAlTf/SsvsM3h6PESgsQM223AYPxxUdpnxTDz838
// SIG // fQEp40XOj5mOZKkNPIsg4gOGy1REQTe16QIDAQABo4IB
// SIG // VzCCAVMwDgYDVR0PAQH/BAQDAgeAMBYGA1UdJQEB/wQM
// SIG // MAoGCCsGAQUFBwMIMEEGA1UdIAQ6MDgwNgYKYIZIAYb6
// SIG // bAoDBTAoMCYGCCsGAQUFBwIBFhpodHRwOi8vd3d3LmVu
// SIG // dHJ1c3QubmV0L3JwYTAJBgNVHRMEAjAAMGgGCCsGAQUF
// SIG // BwEBBFwwWjAjBggrBgEFBQcwAYYXaHR0cDovL29jc3Au
// SIG // ZW50cnVzdC5uZXQwMwYIKwYBBQUHMAKGJ2h0dHA6Ly9h
// SIG // aWEuZW50cnVzdC5uZXQvdHMxLWNoYWluMjU2LmNlcjAx
// SIG // BgNVHR8EKjAoMCagJKAihiBodHRwOi8vY3JsLmVudHJ1
// SIG // c3QubmV0L3RzMWNhLmNybDAfBgNVHSMEGDAWgBTDwnHS
// SIG // e9doBa47OZs0JQxiA8dXaDAdBgNVHQ4EFgQUIJB53ibL
// SIG // FdoHQvuKFQ1xnhloiCwwDQYJKoZIhvcNAQELBQADggEB
// SIG // AMSyYtmyy6moYNtBptNAPWG9+u/3lLVIzW5y1YblGKmx
// SIG // QYmYrwQVq32r9RUCxGvAqUkoLVjXUwxZBzbOqgt46WXA
// SIG // xCMRNNTAapj7gfOsmGC09z4AdHCFcjC2wmkxWzwGbgT/
// SIG // QeRFlF5wilI7DsqHYWxASFYPHcEn6vJeYCD8hvo0V8Q/
// SIG // 4qVKi7sG82sdCQJQ3fgXS9J0Iaz5n0n37ErYOlX5VenF
// SIG // j20iBFlKUz0dU6KqM3ttARW+fqW6n7JR3Xdx2LGC6ll9
// SIG // ja0+TUaM/jglp/yk3hO+/hDS8JY35Y8cqazT2GpupVbc
// SIG // JlrpX4HdkE+YaYhNz4KUqmL1nwTm/b9mmsIwggUTMIID
// SIG // +6ADAgECAgxY2hP/AAAAAFHODfcwDQYJKoZIhvcNAQEL
// SIG // BQAwgbQxFDASBgNVBAoTC0VudHJ1c3QubmV0MUAwPgYD
// SIG // VQQLFDd3d3cuZW50cnVzdC5uZXQvQ1BTXzIwNDggaW5j
// SIG // b3JwLiBieSByZWYuIChsaW1pdHMgbGlhYi4pMSUwIwYD
// SIG // VQQLExwoYykgMTk5OSBFbnRydXN0Lm5ldCBMaW1pdGVk
// SIG // MTMwMQYDVQQDEypFbnRydXN0Lm5ldCBDZXJ0aWZpY2F0
// SIG // aW9uIEF1dGhvcml0eSAoMjA0OCkwHhcNMTUwNzIyMTkw
// SIG // MjU0WhcNMjkwNjIyMTkzMjU0WjCBsjELMAkGA1UEBhMC
// SIG // VVMxFjAUBgNVBAoTDUVudHJ1c3QsIEluYy4xKDAmBgNV
// SIG // BAsTH1NlZSB3d3cuZW50cnVzdC5uZXQvbGVnYWwtdGVy
// SIG // bXMxOTA3BgNVBAsTMChjKSAyMDE1IEVudHJ1c3QsIElu
// SIG // Yy4gLSBmb3IgYXV0aG9yaXplZCB1c2Ugb25seTEmMCQG
// SIG // A1UEAxMdRW50cnVzdCBUaW1lc3RhbXBpbmcgQ0EgLSBU
// SIG // UzEwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIB
// SIG // AQDZI+YUpOh8S4VxWPv4geZyi11Gw4gAHzjQiuHWblYw
// SIG // 5a/aZFB9whM5+71mtNqE+4PQKB/LduhgUGmb885PE+LB
// SIG // PsHfEssyo/heRCIOzDrpjUm5YHTI3lQ9QV5DXyhGqaa3
// SIG // yhArIrxbTVuMF2UShv0sd9XFoIzKwoPgR1d853CuYkUn
// SIG // MRgK1MCkGFVS92DGBEuz3WgybhAfNBG4Enhk8e6p4Pfj
// SIG // sSKPNFply4r04UVQdN+Tl6Y05tBMO583SVKnU06fLmdc
// SIG // 7Zb8pb90UYjjqo692bEvX1AwFvRRYCJrmcv/4VQ7uftE
// SIG // OKUIOSObaUf6PMTQ56rfRrLs8ooZrCmyOJV1AgMBAAGj
// SIG // ggEjMIIBHzASBgNVHRMBAf8ECDAGAQH/AgEAMA4GA1Ud
// SIG // DwEB/wQEAwIBBjA7BgNVHSAENDAyMDAGBFUdIAAwKDAm
// SIG // BggrBgEFBQcCARYaaHR0cDovL3d3dy5lbnRydXN0Lm5l
// SIG // dC9ycGEwMwYIKwYBBQUHAQEEJzAlMCMGCCsGAQUFBzAB
// SIG // hhdodHRwOi8vb2NzcC5lbnRydXN0Lm5ldDAyBgNVHR8E
// SIG // KzApMCegJaAjhiFodHRwOi8vY3JsLmVudHJ1c3QubmV0
// SIG // LzIwNDhjYS5jcmwwEwYDVR0lBAwwCgYIKwYBBQUHAwgw
// SIG // HQYDVR0OBBYEFMPCcdJ712gFrjs5mzQlDGIDx1doMB8G
// SIG // A1UdIwQYMBaAFFXkgdERgL7YibkIozH5oSQJFrlwMA0G
// SIG // CSqGSIb3DQEBCwUAA4IBAQAdJOeadFuqcPyxDjFF1ywA
// SIG // f2Y6K6CaNKqsY22J+Z/fDXf9JCP8T5y3b4/z9B+2wf3W
// SIG // HMSMiGbBY426V3fTuBoeyFGtzGA2GodqKOoRZd7MPCyM
// SIG // dLfoUEPTzCjoFWwRKp8UlSnJBVe1ZzboPKmD70HBIRbT
// SIG // fvctEUdmdmCCEmmMdlVzD98vS13pbCP4B/a1fdZpRZxY
// SIG // fWEu/HhLQ06JkUZELKBTqEWh9hZYu5ET8kvF3wvA564p
// SIG // er1Fs+dwMOc0jut69tO10d5rE5lGs4vSTZN1tfFvv9wA
// SIG // KMIlv7zno2U07D8NHZeM+qqIIqQYNdsFjnbjEMgpj2PQ
// SIG // rqwY2drEn1ESMYIDZDCCA2ACAQEwgcgwgbIxCzAJBgNV
// SIG // BAYTAlVTMRYwFAYDVQQKEw1FbnRydXN0LCBJbmMuMSgw
// SIG // JgYDVQQLEx9TZWUgd3d3LmVudHJ1c3QubmV0L2xlZ2Fs
// SIG // LXRlcm1zMTkwNwYDVQQLEzAoYykgMjAxNSBFbnRydXN0
// SIG // LCBJbmMuIC0gZm9yIGF1dGhvcml6ZWQgdXNlIG9ubHkx
// SIG // JjAkBgNVBAMTHUVudHJ1c3QgVGltZXN0YW1waW5nIENB
// SIG // IC0gVFMxAhEAq91nZfJa71AAAAAAVZHpDDANBglghkgB
// SIG // ZQMEAgEFAKCCAWwwGgYJKoZIhvcNAQkDMQ0GCyqGSIb3
// SIG // DQEJEAEEMC8GCSqGSIb3DQEJBDEiBCDPc6U9LXtKzTHJ
// SIG // vBRcaat7FYP5L3A8R8GTgTRZ6eIJSDCCARsGCyqGSIb3
// SIG // DQEJEAIMMYIBCjCCAQYwggECMIHnBBTA9ZQXZWnXgKsO
// SIG // z9/b4qnBr2RO3jCBzjCBuKSBtTCBsjELMAkGA1UEBhMC
// SIG // VVMxFjAUBgNVBAoTDUVudHJ1c3QsIEluYy4xKDAmBgNV
// SIG // BAsTH1NlZSB3d3cuZW50cnVzdC5uZXQvbGVnYWwtdGVy
// SIG // bXMxOTA3BgNVBAsTMChjKSAyMDE1IEVudHJ1c3QsIElu
// SIG // Yy4gLSBmb3IgYXV0aG9yaXplZCB1c2Ugb25seTEmMCQG
// SIG // A1UEAxMdRW50cnVzdCBUaW1lc3RhbXBpbmcgQ0EgLSBU
// SIG // UzECEQCr3Wdl8lrvUAAAAABVkekMMBYEFAEHM8T0FDs/
// SIG // UKiSiwTZFEYy9bVeMA0GCSqGSIb3DQEBCwUABIIBAEFC
// SIG // Z1cXqPqD16qO82jcOAUIatFmvlY8/6m86J6d3Mq48J2L
// SIG // dZKD+QYIHUqowgvRXkM5bmyjEsfVPtxZvI+cT4TNJoGG
// SIG // UQA035pdxgdxyYQWGO6jKyIqsvcKgHPoYGB8gyM9/O62
// SIG // pyiBKWnG2CchFmYn+/Jhfg0ZAtmL7LjiwXMgB9+MjAjI
// SIG // ls32jDrry8ngNbCKztFQ0WMmsUa4EjZItdt+ZBE2cJUk
// SIG // SwHO4zkCrRDCOFtM7M75aXR3mP4OS9LcbkCgjlOXN18M
// SIG // XAkbGosOtJjVpf9fca/nnNxnN2bIip+3IzuoFdlxJ9zO
// SIG // 65Np2Oo58ZkOc5pp3t7OaVrDiweE2nU=
// SIG // End signature block
