(function(n,t,i,r){i.plugin({name:"searchAddons",create:function(){function c(n,t,i){t!==r&&n.attr("title",t),i!==r&&(n.attr("class",(n.attr("class")||"").replace(/ui-icon[\w\-]*\s*/g,"")),n.addClass(i)),h.push(u)}var e=i.search,s,o;if(e){var l=e.options,a=i.setting("search.buttons")||{},f,u,h=[];f=a.go||{},u=n(f.id||"#c1searchButtonGo"),u.length&&(u.click(function(){this.disabled||e.search()}),c(u,f.label,f.icon),e.buttonGo=u),f=a.help||{},u=n(f.id||"#c1searchButtonHelp"),u.length&&(s=n(l.helpMessageElement||"#c1searchHelpMessage"),o=l.operators,s.html(t.str(i.setting("search.strings.helpMessage"),"").replace(/#{and}/g,o.and).replace(/#{or}/g,o.or).replace(/#{not}/g,o.not)),u.click(function(){this.disabled||i.popup(n(this),"toggle")}),i.popup(u,{autoShow:!1,html:s.show(),position:{maxWidth:300}}),c(u,f.label,f.icon),e.buttonHelp=u,e.helpMessage=s),f=a.highlight,u=n(f.id||"#c1searchButtonHighlight"),u.length&&(function(n,t){function i(i,u){i=i==r?t.disabled:!!i,n.css("opacity",i?1:.3),t.disabled=!i,!u&&e.highlight(i)}i(!t.disabled,!0),n.click(function(){i()})}(u,l.highlight||{}),c(u,f.label,f.icon),e.buttonHighlight=u),e.buttons=h=n(h)}}})})(jQuery,nethelp,nethelpshell)