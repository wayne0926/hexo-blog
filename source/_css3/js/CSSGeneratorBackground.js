if(localStorage["cssgenerator.allow_statistics"] === undefined)
{

	localStorage["cssgenerator.allow_statistics"] = "1";

}

var CSSGeneratorBackground = function()
{

	return {

		Init : function(type, previousVersion)
		{

			var manifest = chrome.runtime.getManifest();
			var version = manifest.version;

			switch (type)
			{

				case "install":

					CSSGeneratorBackground.Analytics.TrackEvent("Run", "Install", version);

					break;

				case "update":

					CSSGeneratorBackground.Analytics.TrackEvent("Run", "Update", version);

					break;

				default:

					CSSGeneratorBackground.Analytics.TrackEvent("Run", "Open", version);

					break;

			}

		},

		CheckMessage : function(request, sender, sendResponse)
		{

			switch(request.method)
			{

				case "getLocalStorage":

					if(!!request.key)
					{

						sendResponse({data: localStorage[request.key]});

					} else {

						sendResponse({data: localStorage});

					}

					break;

				default:

					sendResponse({}); // snub them.

					break;

			}

		},

		SendNotification : function(strMessage,strIcon,strTabUrl)
		{

			// Create a simple text notification:

			var notification = webkitNotifications.createNotification(
				strIcon,  // icon url - can be relative
				'CSS3 Generator',  // notification title
				strMessage  // notification body text
			);

			notification.show();

			setTimeout(function()
			{

				notification.cancel();

			}, 5000);


		}

	};

}();

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://ssl.google-analytics.com/analytics.js','ga');

ga('create', 'UA-2100376-40', 'css3-generator-extension.com');
ga('send', 'pageview');

(function(pr)
{

	pr.Analytics = {

		CheckEnabled : function(callback)
		{

			var blnEnabled = localStorage['cssgenerator.allow_statistics'] === "1";
			if(!blnEnabled)
			{

			} else {

				callback();

			}

		},

		TrackPageview : function (page)
		{

			this.CheckEnabled(function()
			{

				ga('send', 'pageview', page);

			});

		},

		TrackEvent : function (category, action, label, value)
		{

			this.CheckEnabled(function ()
			{

				if(!!label && !!value)
				{

					ga('send', 'event', category, action, label, value);

				} else if(!!label)
				{

					ga('send', 'event', category, action, label);

				} else {

					ga('send', 'event', category, action);

				}

			});

		}

	};

})(CSSGeneratorBackground);

/**
 * Listen for messages from our front-end script
 */
chrome.runtime.onMessage.addListener(CSSGeneratorBackground.CheckMessage);