/**
 * CSS3Generator main JS file, does a lot of funky stuff but
 * has become rather bloated and could do with a clean up when
 * I get some time to go through it
 *
 * @author	- Alex Hall
 * @date	- 25/03/2014
 * @version	- 1.0.0
 */
var CSSGenerator = function()
{
	/**
	 * Always go strict boys and girls
	 */
	"use strict";

	return {

		/**
		 * Main setup init function, calls everything we need (and sets up defaults)
		 */
		Init : function()
		{

			if(localStorage["cssgenerator.active_tab"] === undefined) localStorage["cssgenerator.active_tab"] = 0;

			// Text shadow

			CSSGenerator.CSSTextShadow();

			// RGBa to hex converter

			CSSGenerator.CSSRGBHex();

			// Setup the transforms stuff

			CSSGenerator.CSSTranforms();

			// Box shadow

			CSSGenerator.CSSBoxShadow();

			// Border Radius

			CSSGenerator.CSSBorderRadius();

			// Columns

			CSSGenerator.CSSColumns();

			// Gradients (linear)

			CSSGenerator.CSSLinearGradients();

			// Gradients (radial)

			CSSGenerator.CSSRadialGradients();

			// Gradients (striped)

			CSSGenerator.CSSStripedGradients();

			// Arrows in pure CSS

			CSSGenerator.CSSArrows();

			// Transitions

			CSSGenerator.CSSTransitions();

			// CSS filters

			CSSGenerator.CSSFilters();

			// Firstly, our tab switcher

			CSSGenerator.SetupTabs();

			// Our helpers can be amalgamated, I reckon'
			// anything after a slider

			$("#generator-switcher").on("keyup", ".CSSHelper", CSSGenerator.HandleKeyUp);
			$("#generator-switcher").on("blur", ".CSSHelper", CSSGenerator.HandleBlur);

			// And our funky labels!

			CSSGenerator.InitFunkyLabels();

			// And external links

			$("a[href^='http']").on("click", function(){ var strHref = $(this).attr("href"); chrome.tabs.create({ "url" : strHref, "active" : false }); });

		},

		/**
		 * Handles the little tabs as the uikit uses eval.. tut tut!
		 */
		SetupTabs : function()
		{

			$(".uk-tab").each(function(i,el)
			{

				var objList = $(this);
				var objSwitcher = $(this).next();

				objList.find("a").each(function(i,el)
				{

					$(this).on("click", CSSGenerator.SetTabListener);

				});

			});

			// Set the main tab last active to active

			$(".main-list").find("a").eq(parseInt(localStorage["cssgenerator.active_tab"])).trigger("click");

			// Set the last sub tab to be active as active

			$(".sub-list").each(function()
			{

				var strList = $(this).data("list");

				if(localStorage["cssgenerator." + strList + "_active_sub_tab"] === undefined) localStorage["cssgenerator." + strList + "_active_sub_tab"] = 0;

				$(this).find("a").eq(parseInt(localStorage["cssgenerator." + strList + "_active_sub_tab"])).trigger("click", [true]);

			});

		},

		/**
		 * Because we have dynamic tabs we're going to need to call this
		 * from various places so it has been moved out of the above function
		 * @param {object} e         The event listener object
		 * @param {boolean} blnSilent Whether or not to handle the click silently
		 */
		SetTabListener : function(e, blnSilent)
		{

			e.preventDefault();

			var objLink = $(this);

			var i = parseFloat(objLink.data("index"));

			var objParent = $(this).closest("ul");
			var objMainList = objParent.next();

			// Remove the active class from the main tab element

			objParent.find("> .uk-active").removeClass("uk-active");

			// Add it to the click link parent

			objLink.parent().addClass("uk-active");

			// Remove the active class from the main list element

			objMainList.find("> .uk-active").removeClass("uk-active");

			// Add it to the one we clicked

			var objCurrentList = objMainList.find("> li:nth-child(" + (i + 1) + ")");
			objCurrentList.addClass("uk-active");

			// Defaults...

			var arrScript;
			var objObject;
			var strScript;
			var objFunction;

			if(objParent.hasClass("main-list"))
			{

				localStorage["cssgenerator.active_tab"] = i;

				if(objLink.data("function"))
				{

					// This is not a sub tab, call the main function

					arrScript = objLink.data("function").split(".");

					objObject = arrScript[0];
					strScript = arrScript[1];

					objFunction = window[objObject][strScript];

					if(typeof objFunction === "function")
					{

						objFunction();

					}

				} else {

					// This has sub tabs, find the active one and call it's function

					var objSubList = objCurrentList.find(".sub-list");
					objSubList.find("> .uk-active").removeClass("uk-active");

					var objSubLi = objSubList.find("li").eq(parseInt(localStorage["cssgenerator." + objSubList.data("list") + "_active_sub_tab"]));
					objSubLi.addClass("uk-active");

					var objSubMainEl = objSubList.next();
					objSubMainEl.find("> .uk-active").removeClass("uk-active");

					var objMainSubLi = objSubMainEl.find("li").eq(parseInt(localStorage["cssgenerator." + objSubList.data("list") + "_active_sub_tab"]));
					objMainSubLi.addClass("uk-active");

					var objSubLink = objSubLi.find("a");

					arrScript = objSubLink.data("function").split(".");

					objObject = arrScript[0];
					strScript = arrScript[1];

					objFunction = window[objObject][strScript];

					if(typeof objFunction === "function")
					{

						objFunction();

					}								

				}

			} else {

				localStorage["cssgenerator." + objMainList.attr("id") + "_active_sub_tab"] = i;

				// This is a check to see whether the click is "silent" (already handled)

				if(!blnSilent)
				{

					if(objLink.data("function"))
					{

						arrScript = objLink.data("function").split(".");

						objObject = arrScript[0];
						strScript = arrScript[1];

						objFunction = window[objObject][strScript];

						if(typeof objFunction === "function")
						{

							objFunction();

						}

					}

				}

			}

		},

		/**
		 * For keyup events on our helpers we need to determine
		 * the range values and check them against the current value
		 * then set it as the slider value
		 */
		HandleKeyUp : function(e)
		{

			var intKey = e.keyCode;

			var objEl = $(this);
			var objSlider = objEl.prev();
			var strType = objEl.data("type");

			var intVal = parseFloat(objEl.val());
			var intMinVal = parseFloat(objSlider.attr("min"));
			var intMaxVal = parseFloat(objSlider.attr("max"));
			var intStep = parseFloat(objSlider.attr("step")) || 1;

			if(intVal < intMinVal)
			{

				intVal = intMinVal;
				objEl.val(intVal);

			}

			if(intVal > intMaxVal)
			{

				intVal = intMaxVal;
				objEl.val(intVal);

			}

			if(intKey === 38)
			{

				intVal = intVal + intStep;
				objEl.val(intVal);
				objSlider.val(intVal).trigger("change");

			} else if(intKey === 40)
			{

				intVal = intVal - intStep;
				objEl.val(intVal);
				objSlider.val(intVal).trigger("change");

			} else {

				objSlider.val(intVal);

			}

		},

		/**
		 * And when the helper is blurred we need to check the type and
		 * change the value accordingly, then call the sliders change
		 * event to save things
		 */
		HandleBlur : function()
		{

			var objEl = $(this);

			var strType = objEl.data("type");
			var intVal = objEl.val();

			switch(strType)
			{

				case 'px':

					objEl.val(CSSGenerator.FormatPixels(intVal));

					break;

				case 'perc':

					objEl.val(CSSGenerator.FormatPercentage(intVal));

					break;

				case 'deg':

					objEl.val(CSSGenerator.FormatDegrees(intVal));

					break;

				case 'seconds':

					objEl.val(intVal + 's');

					break;

			}

			objEl.prev().trigger("change", [parseFloat(intVal)]);

		},

		/**
		 * Setup the funky checkboxes
		 */
		InitFunkyLabels : function()
		{

			// Fancy checkboxes and radios

			$('.label-checkbox, .label-radio').on("click", function()
			{

				CSSGenerator.SetupLabels();

			});

			CSSGenerator.SetupLabels();

		},

		/**
		 * Setup the funky labels and checkboxes with the nice images instead of
		 * crappy browser ones
		 */
		SetupLabels : function()
		{

			if($('.label-checkbox input').length)
			{

				$('.label-checkbox').each(function()
				{

					$(this).removeClass('c_on');

				});

				$('.label-checkbox input:checked').each(function()
				{

					$(this).parent().addClass('c_on');

				});

			}

			$('.label-checkbox input:disabled').each(function()
			{

				$(this).parent().addClass('c_disabled');

			});

			if($('.label-radio input').length)
			{

				$('.label-radio').each(function()
				{

					$(this).removeClass('r_on');

				});

				$('.label-radio input:checked').each(function()
				{

					$(this).parent().addClass('r_on');

				});

			}

			$('.label-radio input:disabled').each(function()
			{

				$(this).parent().addClass('r_disabled');

			});

		},

		/**
		 * Setup the CSS text shadow section
		 */
		CSSTextShadow : function()
		{

			if(localStorage["cssgenerator.text_shadows"] === undefined) localStorage["cssgenerator.text_shadows"] = JSON.stringify([
				{"horizontal" : "3", "vertical" : "3", "blur_radius" : "3", "shadow_color" : "000000", "opacity" : "1"}
			]);

			var arrTextShadows = JSON.parse(localStorage["cssgenerator.text_shadows"]);

			// Create those text shadow options

			$.each(arrTextShadows, CSSGenerator.AddTextShadowOption);

			// Add the classes we need

			$("#CSSTextShadowList").find("li:last-child").addClass("uk-active");
			$("#text_shadow_switcher").find("li:last-child").addClass("uk-active");

			// And setup some click events for our newly created stuff

			$("#CSSTextShadowList").on("click", "a", CSSGenerator.SetTabListener);
			$("#text_shadow_switcher").on("click", ".CSSTextShadowRemove", function(e)
			{

				e.preventDefault();

				var objLink = $(this);
				var objLi = objLink.closest('li');
				var intIndex = objLi.data("index");
				objLi.remove();
				$("#CSSTextShadowList").find("li").eq(intIndex).remove();
				$("#CSSTextShadowList").find("a").eq(0).trigger("click");

				CSSGenerator.SetTextShadow();

			});

			// Add a new shadow

			$("#CSSTextShadowAdd").on("click", function(e)
			{

				e.preventDefault();

				CSSGenerator.AddTextShadowOption($(".a-text-shadow").length,{"horizontal" : "3", "vertical" : "3", "blur_radius" : "3", "shadow_color" : "000000", "opacity" : "1"});

				CSSGenerator.SetTextShadow();

			});

			$("#text_shadow_switcher").on("input change", ".CSSTextShadowUpdater", function()
			{

				var objEl = $(this);

				if(!!objEl.next())
				{

					if(objEl.next().data("type") === "px")
					{

						objEl.next().val(CSSGenerator.FormatPixels(objEl.val()));

					} else {

						objEl.next().val(objEl.val());

					}

				}

				CSSGenerator.SetTextShadow();

			});

		},

		AddTextShadowOption : function(intIndex,objShadow)
		{

			if(intIndex > 7)
			{

				return false;

			}

			$("#CSSTextShadowList").append('<li>\
				<a href="#n" data-function="CSSGenerator.SetTextShadow" data-index="' + intIndex + '">#' + (intIndex + 1) + '</a>\
			</li>');

			var strButton = intIndex > 0 ? '<a href="" class="uk-button uk-button-danger uk-float-right CSSTextShadowRemove"><i class="fa fa-times"></i></a>' : '';

			var objLi = $('<li class="a-text-shadow" data-index="' + intIndex + '">\
				<div class="uk-panel uk-panel-box">\
					<form method="post" action="" class="uk-form">\
						<fieldset>\
							' + strButton + '\
							<div class="uk-form-row">\
								<label class="uk-form-label" for="CSSTextShadowHorizontal">水平偏移:</label>\
								<div class="uk-form-controls">\
									<input type="range" min="-75" max="75" value="' + objShadow.horizontal + '" class="CSSTextShadowUpdater CSSTextShadowHorizontal" /> <input type="text" class="help-inline CSSGeneratorHelper CSSHelper" data-type="px" value="' + objShadow.horizontal + 'px"/>\
								</div>\
							</div>\
							<div class="uk-form-row">\
								<label class="uk-form-label" for="CSSTextShadowVertical">垂直偏移:</label>\
								<div class="uk-form-controls">\
									<input type="range" min="-75" max="75" value="' + objShadow.vertical + '" class="CSSTextShadowUpdater CSSTextShadowVertical" /> <input type="text" class="help-inline CSSGeneratorHelper CSSHelper" data-type="px" value="' + objShadow.vertical + 'px"/>\
								</div>\
							</div>\
							<div class="uk-form-row">\
								<label class="uk-form-label" for="CSSTextShadowBlurRadius">模糊半径:</label>\
								<div class="uk-form-controls">\
									<input type="range" min="0" max="50" value="' + objShadow.blur_radius + '" class="CSSTextShadowUpdater CSSTextShadowBlurRadius" /> <input type="text" class="help-inline CSSGeneratorHelper CSSHelper" data-type="px" value="' + objShadow.blur_radius + 'px"/>\
								</div>\
							</div>\
							<div class="uk-form-row">\
								<label class="uk-form-label" for="CSSTextShadowColour">阴影颜色:</label>\
								<div class="uk-form-controls">\
									<input type="text" value="' + objShadow.shadow_color + '" class="color CSSTextShadowUpdater CSSTextShadowColour" />\
								</div>\
							</div>\
							<div class="uk-form-row">\
								<label class="uk-form-label" for="CSSTextShadowOpacity">透明度:</label>\
								<div class="uk-form-controls">\
									<input type="range" min="0" max="1" step="0.1" value="' + objShadow.opacity + '" class="CSSTextShadowUpdater CSSTextShadowOpacity" /> <input type="text" class="help-inline CSSGeneratorHelper CSSHelper" data-type="" value="' + objShadow.opacity + '"/>\
								</div>\
							</div>\
						</fieldset>\
					</form>\
				</div>\
			</li>');

			$("#text_shadow_switcher").append(objLi);

			var objColor = objLi.find(".CSSTextShadowColour");
			var objJsColor = new jscolor.color(objColor[0],{});
			objJsColor.fromString(objShadow.shadow_color);

		},

		/**
		 * Get all the information from the text shadow form and update
		 * the example box
		 */
		SetTextShadow : function(blnIsInput)
		{

			var arrTextShadows = [];
			var strTextShadow = '';
			var strHorizontal = '';
			var strVertical = '';
			var strBlur = '';
			var strColour = '';
			var strIEColour = '';

			$("#text_shadow_switcher").find(".a-text-shadow").each(function(i,el)
			{

				strHorizontal = $(el).find(".CSSTextShadowHorizontal").val();
				strVertical = $(el).find(".CSSTextShadowVertical").val();
				strBlur = $(el).find(".CSSTextShadowBlurRadius").val();
				strColour = strIEColour = $(el).find(".CSSTextShadowColour").val();
				var strOpacity = $(el).find(".CSSTextShadowOpacity").val();

				var objTextShadow = {
					"horizontal" : strHorizontal,
					"vertical" : strVertical,
					"blur_radius" : strBlur,
					"shadow_color" : strColour,
					"opacity" : strOpacity
				};

				arrTextShadows.push(objTextShadow);

				if(parseFloat(strOpacity) < 1)
				{

					var objColors = CSSGenerator.HexToRgba(strColour);

					strColour = 'rgba(' + objColors.r + ',' + objColors.g + ',' + objColors.b + ',' + strOpacity + ')';

				} else {

					strColour = '#' + strColour;

				}

				if(i > 0)
				{

					strTextShadow+= ", " + CSSGenerator.FormatPixels(strVertical) + " " + CSSGenerator.FormatPixels(strHorizontal) + " " + CSSGenerator.FormatPixels(strBlur) + " " + strColour;

				} else {

					strTextShadow+= CSSGenerator.FormatPixels(strVertical) + " " + CSSGenerator.FormatPixels(strHorizontal) + " " + CSSGenerator.FormatPixels(strBlur) + " " + strColour;

				}

			});

			localStorage["cssgenerator.text_shadows"] = JSON.stringify(arrTextShadows);

			var strDirection = CSSGenerator.GetAngle(parseFloat(strHorizontal),parseFloat(strVertical));
			
			$("#CSSGeneratorTextShadow").css("text-shadow", strTextShadow);

			$("#CSSGeneratorOutput").html('-ms-filter: "progid:DXImageTransform.Microsoft.Shadow(Strength=' + strBlur + ', Direction=' + strDirection + ', Color=#' + strIEColour + ')";/*IE 8*/<br/>text-shadow: ' + strTextShadow + ';/* FF3.5+, Opera 9+, Saf1+, Chrome, IE10 */<br/>filter: progid:DXImageTransform.Microsoft.Shadow(Strength=' + strBlur + ', Direction=135, Color=#' + strIEColour + '); /*IE 5.5-7*/');

		},

		/**
		 * RGBa and hexadecimal converter (both ways)
		 */
		CSSRGBHex : function()
		{

			// Defaults

			var strR = localStorage["cssgenerator.rgba_hex_r"] === undefined ? "255" : localStorage["cssgenerator.rgba_hex_r"];
			var strG = localStorage["cssgenerator.rgba_hex_g"] === undefined ? "255" : localStorage["cssgenerator.rgba_hex_g"];
			var strB = localStorage["cssgenerator.rgba_hex_b"] === undefined ? "255" : localStorage["cssgenerator.rgba_hex_b"];
			var strOpacity = localStorage["cssgenerator.rgba_hex_opacity"] === undefined ? "1" : localStorage["cssgenerator.rgba_hex_opacity"];
			var strHex = localStorage["cssgenerator.rgba_hex"] === undefined ? "FFFFFF" : localStorage["cssgenerator.rgba_hex"];

			// Events

			$("#CSSRGBAHex").on("keyup", function()
			{

				var objEl = $(this);
				var strHex = objEl.val();

				if(strHex.indexOf("#") === -1)
				{

					strHex = "#" + strHex;

				}

				if(strHex.length === 7)
				{

					var objRgb = CSSGenerator.HexToRgba(strHex);

					if(!!objRgb)
					{

						$("#CSSRGBAR").val(objRgb.r);
						$("#CSSRGBAG").val(objRgb.g);
						$("#CSSRGBAB").val(objRgb.b);

						CSSGenerator.SetRGBHex();

					}

				}

			}).val(strHex);

			$("#CSSRGBAR,#CSSRGBAG,#CSSRGBAB").on("change", function()
			{

				CSSGenerator.SetRGBHex(true);

			});

			$("#CSSRGBAR").val(strR);
			$("#CSSRGBAG").val(strG);
			$("#CSSRGBAB").val(strB);

			$("#CSSRGBAOpacity").on("input change", function()
			{

				CSSGenerator.SetRGBHex();

			}).val(strOpacity);

			$("#CSSRGBOutput").val('rgb(' + strR + ', ' + strG + ', ' + strB + ')');
			$("#CSSRGBAOutput").val('rgb(' + strR + ', ' + strG + ', ' + strB + ', ' + strOpacity + ')');
			$("#CSSRGBAColour").css("background-color", 'rgb(' + strR + ', ' + strG + ', ' + strB + ')');

		},

		/**
		 * Set the given values and do the conversions required
		 */
		SetRGBHex : function(blnFromRgb)
		{

			var strR = $("#CSSRGBAR").val();
			var strG = $("#CSSRGBAG").val();
			var strB = $("#CSSRGBAB").val();
			var strOpacity = $("#CSSRGBAOpacity").val();
			var strHex = $("#CSSRGBAHex").val();

			if(parseFloat(strR) > 255)
			{

				strR = 255;

			} else if(parseFloat(strR) < 0)
			{

				strR = 0;

			}

			$("#CSSRGBAR").val(strR);

			if(parseFloat(strG) > 255)
			{

				strG = 255;

			} else if(parseFloat(strG) < 0)
			{

				strG = 0;

			}

			$("#CSSRGBAG").val(strG);

			if(parseFloat(strB) > 255)
			{

				strB = 255;

			} else if(parseFloat(strB) < 0)
			{

				strB = 0;

			}

			$("#CSSRGBAB").val(strB);

			if(strR !== "" && strG !== "" && strB !== "")
			{

				// Set items in localStorage

				localStorage["cssgenerator.rgba_hex_r"] = strR;
				localStorage["cssgenerator.rgba_hex_g"] = strG;
				localStorage["cssgenerator.rgba_hex_b"] = strB;
				localStorage["cssgenerator.rgba_hex_opacity"] = strOpacity;

				// Work out the hexadecimal

				strHex = CSSGenerator.RgbToHex(strR,strG,strB);
				localStorage["cssgenerator.rgba_hex"] = strHex;

				if(blnFromRgb)
				{

					$("#CSSRGBAHex").val(strHex);
					
				}

				$("#CSSRGBOutput").val('rgb(' + strR + ', ' + strG + ', ' + strB + ')');
				$("#CSSRGBAOutput").val('rgba(' + strR + ', ' + strG + ', ' + strB + ', ' + strOpacity + ')');
				$("#CSSRGBAColour").css("background-color", 'rgba(' + strR + ', ' + strG + ', ' + strB + ', ' + strOpacity + ')');

				$("#CSSGeneratorOutput").html('background-color: ' + strHex + ';<br/>background-color: rgb(' + strR + ', ' + strG + ', ' + strB + ');<br/>background-color: rgba(' + strR + ', ' + strG + ', ' + strB + ', ' + strOpacity + ');');

			} else if(strHex !== "")
			{

				var objRgb = CSSGenerator.HexToRgba(strHex);

				if(!!objRgb)
				{

					$("#CSSRGBAR").val(objRgb.r);
					$("#CSSRGBAG").val(objRgb.g);
					$("#CSSRGBAB").val(objRgb.b);

					$("#CSSRGBAColour").css("background-color", strHex);

					$("#CSSGeneratorOutput").html('background-color: ' + strHex + ';<br/>background-color: rgb(' + strR + ', ' + strG + ', ' + strB + ');<br/>background-color: rgba(' + strR + ', ' + strG + ', ' + strB + ', ' + strOpacity + ');');

				}

			}

		},

		/**
		 * Go for CSS3 transforms! You can do some interesting stuff with these
		 */
		CSSTranforms : function()
		{

			// Setup some defaults

			if(localStorage["cssgenerator.transforms_rotate"] === undefined) localStorage["cssgenerator.transforms_rotate"] = "0";
			if(localStorage["cssgenerator.transforms_scale_x"] === undefined) localStorage["cssgenerator.transforms_scale_x"] = "1";
			if(localStorage["cssgenerator.transforms_scale_y"] === undefined) localStorage["cssgenerator.transforms_scale_y"] = "1";
			if(localStorage["cssgenerator.transforms_skew_x"] === undefined) localStorage["cssgenerator.transforms_skew_x"] = "0";
			if(localStorage["cssgenerator.transforms_skew_y"] === undefined) localStorage["cssgenerator.transforms_skew_y"] = "0";
			if(localStorage["cssgenerator.transforms_translate_x"] === undefined) localStorage["cssgenerator.transforms_translate_x"] = "0";
			if(localStorage["cssgenerator.transforms_translate_y"] === undefined) localStorage["cssgenerator.transforms_translate_y"] = "0";

			// Event listeners for updates

			$("#CSSTransformsRotate").on("input change", function()
			{

				localStorage["cssgenerator.transforms_rotate"] = $(this).val();

				CSSGenerator.SetTransforms();

			}).val(localStorage["cssgenerator.transforms_rotate"]);

			$("#CSSTransformsScaleX").on("input change", function()
			{

				localStorage["cssgenerator.transforms_scale_x"] = $(this).val();

				CSSGenerator.SetTransforms();

			}).val(localStorage["cssgenerator.transforms_scale_x"]);

			$("#CSSTransformsScaleY").on("input change", function()
			{

				localStorage["cssgenerator.transforms_scale_y"] = $(this).val();

				CSSGenerator.SetTransforms();

			}).val(localStorage["cssgenerator.transforms_scale_y"]);

			$("#CSSTransformsSkewX").on("input change", function()
			{

				localStorage["cssgenerator.transforms_skew_x"] = $(this).val();

				CSSGenerator.SetTransforms();

			}).val(localStorage["cssgenerator.transforms_skew_x"]);

			$("#CSSTransformsSkewY").on("input change", function()
			{

				localStorage["cssgenerator.transforms_skew_y"] = $(this).val();

				CSSGenerator.SetTransforms();

			}).val(localStorage["cssgenerator.transforms_skew_y"]);

			$("#CSSTransformsTranslateX").on("input change", function()
			{

				localStorage["cssgenerator.transforms_translate_x"] = $(this).val();

				CSSGenerator.SetTransforms();

			}).val(localStorage["cssgenerator.transforms_translate_x"]);

			$("#CSSTransformsTranslateY").on("input change", function()
			{

				localStorage["cssgenerator.transforms_translate_y"] = $(this).val();

				CSSGenerator.SetTransforms();

			}).val(localStorage["cssgenerator.transforms_translate_y"]);

		},

		/**
		 * Apply those transforms to our demo
		 */
		SetTransforms : function()
		{

			var intRotation = localStorage["cssgenerator.transforms_rotate"];
			var strScaleX = localStorage["cssgenerator.transforms_scale_x"];
			var strScaleY = localStorage["cssgenerator.transforms_scale_y"];
			var strSkewX = localStorage["cssgenerator.transforms_skew_x"];
			var strSkewY = localStorage["cssgenerator.transforms_skew_y"];
			var strTranslateX = CSSGenerator.FormatPixels(localStorage["cssgenerator.transforms_translate_x"]);
			var strTranslateY = CSSGenerator.FormatPixels(localStorage["cssgenerator.transforms_translate_y"]);

			$("#CSSGeneratorTransformsBox").css("-webkit-transform", "rotate(" + intRotation + "deg) scale(" + strScaleX + ", " + strScaleY + ") skewX(" + strSkewX + "deg) skewY(" + strSkewY + "deg) translate(" + strTranslateX + ", " + strTranslateY + ")");

			$("#CSSGeneratorOutput").html('-moz-transform: rotate(' + intRotation + 'deg) scale(' + strScaleX + ', ' + strScaleY + ') skewX(' + strSkewX + 'deg) skewY(' + strSkewY + 'deg) translate(' + strTranslateX + ', ' + strTranslateY + ');/* FF3.5+ */<br/>-webkit-transform: rotate(' + intRotation + 'deg) scale(' + strScaleX + ', ' + strScaleY + ') skew(' + strSkewX + 'deg, ' + strSkewY + 'deg) translate(' + strTranslateX + ', ' + strTranslateY + ');/*Saf3.1+, Chrome*/<br/>-o-transform: rotate(' + intRotation + 'deg) scale(' + strScaleX + ', ' + strScaleY + ') skew(' + strSkewX + 'deg, ' + strSkewY + 'deg) translate(' + strTranslateX + ', ' + strTranslateY + ');/* Opera 10.5 */<br/>-ms-transform: rotate(' + intRotation + 'deg) scale(' + strScaleX + ', ' + strScaleY + ') skew(' + strSkewX + 'deg, ' + strSkewY + 'deg) translate(' + strTranslateX + ', ' + strTranslateY + ');/* IE 9 */<br/>transform: rotate(' + intRotation + 'deg) scale(' + strScaleX + ', ' + strScaleY + ') skew(' + strSkewX + 'deg, ' + strSkewY + 'deg) translate(' + strTranslateX + ', ' + strTranslateY + ');');

		},

		/**
		 * Actions for the border radius demo
		 */
		CSSBorderRadius : function()
		{

			// Defaults

			if(localStorage["cssgenerator.border_radius_top_left"] === undefined) localStorage["cssgenerator.border_radius_top_left"] = "0";
			if(localStorage["cssgenerator.border_radius_top_right"] === undefined) localStorage["cssgenerator.border_radius_top_right"] = "0";
			if(localStorage["cssgenerator.border_radius_bottom_right"] === undefined) localStorage["cssgenerator.border_radius_bottom_right"] = "0";
			if(localStorage["cssgenerator.border_radius_bottom_left"] === undefined) localStorage["cssgenerator.border_radius_bottom_left"] = "0";
			if(localStorage["cssgenerator.border_radius_colour"] === undefined) localStorage["cssgenerator.border_radius_colour"] = "000000";

			// Event handlers

			$("#CSSBorderRadiusTopLeft").on("input change", function(e, intVal)
			{

				var objEl = $(this);

				if(!!intVal)
				{

					objEl.val(intVal);

				}
				
				localStorage["cssgenerator.border_radius_top_left"] = objEl.val();

				CSSGenerator.SetBorderRadius();

			}).val(localStorage["cssgenerator.border_radius_top_left"]).next().val(localStorage["cssgenerator.border_radius_top_left"]);

			$("#CSSBorderRadiusTopRight").on("input change", function(e, intVal)
			{

				var objEl = $(this);

				if(!!intVal)
				{

					objEl.val(intVal);

				}
				
				localStorage["cssgenerator.border_radius_top_right"] = objEl.val();

				CSSGenerator.SetBorderRadius();

			}).val(localStorage["cssgenerator.border_radius_top_right"]).next().val(localStorage["cssgenerator.border_radius_top_right"]);

			$("#CSSBorderRadiusBottomRight").on("input change", function(e, intVal)
			{

				var objEl = $(this);

				if(!!intVal)
				{

					objEl.val(intVal);

				}

				localStorage["cssgenerator.border_radius_bottom_right"] = objEl.val();

				CSSGenerator.SetBorderRadius();

			}).val(localStorage["cssgenerator.border_radius_bottom_right"]).next().val(localStorage["cssgenerator.border_radius_bottom_right"]);

			$("#CSSBorderRadiusBottomLeft").on("input change", function(e, intVal)
			{

				var objEl = $(this);

				if(!!intVal)
				{

					objEl.val(intVal);

				}

				localStorage["cssgenerator.border_radius_bottom_left"] = objEl.val();

				CSSGenerator.SetBorderRadius();

			}).val(localStorage["cssgenerator.border_radius_bottom_left"]).next().val(localStorage["cssgenerator.border_radius_bottom_left"]);

			$("#CSSBorderRadiusColour").on("change", function(e, intVal)
			{

				var objEl = $(this);

				if(!!intVal)
				{

					objEl.val(intVal);

				}
				
				localStorage["cssgenerator.border_radius_colour"] = objEl.val();

				CSSGenerator.SetBorderRadius();

			}).val(localStorage["cssgenerator.border_radius_colour"]);

		},

		/**
		 * Apply border radius to demo element
		 * @param {boolean} blnIsInput If this is from an input we need an extra step
		 */
		SetBorderRadius : function(blnIsInput)
		{

			var objRadiusTopLeft = $("#CSSBorderRadiusTopLeft");
			var objRadiusTopRight = $("#CSSBorderRadiusTopRight");
			var objRadiusBottomRight = $("#CSSBorderRadiusBottomRight");
			var objRadiusBottomLeft = $("#CSSBorderRadiusBottomLeft");
			var objBorderColour = $("#CSSBorderRadiusColour");

			var strTopLeft = CSSGenerator.FormatPixels(localStorage["cssgenerator.border_radius_top_left"]);
			var strTopRight = CSSGenerator.FormatPixels(localStorage["cssgenerator.border_radius_top_right"]);
			var strBottomRight = CSSGenerator.FormatPixels(localStorage["cssgenerator.border_radius_bottom_right"]);
			var strBottomLeft = CSSGenerator.FormatPixels(localStorage["cssgenerator.border_radius_bottom_left"]);
			var strColour = localStorage["cssgenerator.border_radius_colour"];

			// Set the values from the elements

			if(!blnIsInput)
			{

				objRadiusTopLeft.next().val(strTopLeft);
				objRadiusTopRight.next().val(strTopRight);
				objRadiusBottomRight.next().val(strBottomRight);
				objRadiusBottomLeft.next().val(strBottomLeft);

			}

			var strBorderRadius = "";

			if(strTopRight === strTopLeft && strBottomRight === strTopLeft && strBottomLeft === strTopLeft)
			{

				strBorderRadius = strTopLeft;

			} else {

				if(strTopLeft === strBottomRight && strTopRight === strBottomLeft)
				{

					strBorderRadius = strTopLeft + " " + strTopRight;

				} else {

					strBorderRadius = strTopLeft + " " + strTopRight + " " + strBottomRight;

					if(strBottomLeft !== strTopRight)
					{

						strBorderRadius+= " " + strBottomLeft;

					}

				}

			}
			
			$("#CSSGeneratorBorderRadiusBox").css({ "border" : "2px solid #" + strColour, "border-radius" : strBorderRadius});

			$("#CSSGeneratorOutput").html('-webkit-border-radius: ' + strBorderRadius + ';/*Safari, Chrome*/<br/>-moz-border-radius: ' + strBorderRadius + ';/*Firefox*/<br/>border-radius: ' + strBorderRadius + ';');

		},

		/**
		 * Actions for box shadow
		 */
		CSSBoxShadow : function()
		{

			if(localStorage["cssgenerator.box_shadows"] === undefined) localStorage["cssgenerator.box_shadows"] = JSON.stringify([
				{"horizontal" : "3", "vertical" : "3", "blur_radius" : "3", "spread_radius" : "3", "shadow_color" : "000000", "opacity" : "1", " inset" : ""}
			]);

			var arrBoxShadows = JSON.parse(localStorage["cssgenerator.box_shadows"]);

			// Create those text shadow options

			$.each(arrBoxShadows, CSSGenerator.AddBoxShadowOption);

			// Add the classes we need

			$("#CSSBoxShadowList").find("li:last-child").addClass("uk-active");
			$("#box_shadow_switcher").find("li:last-child").addClass("uk-active");

			// And setup some click events for our newly created stuff

			$("#CSSBoxShadowList").on("click", "a", CSSGenerator.SetTabListener);
			$("#box_shadow_switcher").on("click", ".CSSBoxShadowRemove", function(e)
			{

				e.preventDefault();

				var objLink = $(this);
				var objLi = objLink.closest('li');
				var intIndex = objLi.data("index");
				objLi.remove();
				$("#CSSBoxShadowList").find("li").eq(intIndex).remove();
				$("#CSSBoxShadowList").find("a").eq(0).trigger("click");

				CSSGenerator.SetBoxShadow();

			});

			// Add a new shadow

			$("#CSSBoxShadowAdd").on("click", function(e)
			{

				e.preventDefault();

				CSSGenerator.AddBoxShadowOption($(".a-box-shadow").length,{"horizontal" : "3", "vertical" : "3", "blur_radius" : "3", "spread_radius" : "3", "shadow_color" : "000000", "opacity" : "1", "inset" : ""});

				CSSGenerator.SetBoxShadow();

			});

			$("#box_shadow_switcher").on("input change", ".CSSBoxShadowUpdater", function()
			{

				var objEl = $(this);

				if(!!objEl.next())
				{

					if(objEl.next().data("type") === "px")
					{

						objEl.next().val(CSSGenerator.FormatPixels(objEl.val()));

					} else {

						objEl.next().val(objEl.val());

					}

				}

				CSSGenerator.SetBoxShadow();

			});

		},

		AddBoxShadowOption : function(intIndex,objShadow)
		{

			if(intIndex > 7)
			{

				return false;

			}

			$("#CSSBoxShadowList").append('<li>\
				<a href="#n" data-function="CSSGenerator.SetBoxShadow" data-index="' + intIndex + '">#' + (intIndex + 1) + '</a>\
			</li>');

			var strButton = intIndex > 0 ? '<a href="" class="uk-button uk-button-danger uk-float-right CSSBoxShadowRemove"><i class="fa fa-times"></i></a>' : '';
			var strChecked = objShadow.inset === " inset" ? ' checked="checked"' : '';

			var objLi = $('<li class="a-box-shadow" data-index="' + intIndex + '">\
				<div class="uk-panel uk-panel-box">\
					<form method="post" action="" class="uk-form">\
						<fieldset>\
							' + strButton + '\
							<div class="uk-form-row">\
								<label class="uk-form-label" for="CSSTextShadowHorizontal">垂直偏移:</label>\
								<div class="uk-form-controls">\
									<input type="range" min="-75" max="75" value="' + objShadow.horizontal + '" class="CSSBoxShadowUpdater CSSBoxShadowHorizontal" /> <input type="text" class="help-inline CSSGeneratorHelper CSSHelper" data-type="px" value="' + objShadow.horizontal + 'px"/>\
								</div>\
							</div>\
							<div class="uk-form-row">\
								<label class="uk-form-label" for="CSSTextShadowVertical">水平偏移:</label>\
								<div class="uk-form-controls">\
									<input type="range" min="-75" max="75" value="' + objShadow.vertical + '" class="CSSBoxShadowUpdater CSSBoxShadowVertical" /> <input type="text" class="help-inline CSSGeneratorHelper CSSHelper" data-type="px" value="' + objShadow.vertical + 'px"/>\
								</div>\
							</div>\
							<div class="uk-form-row">\
								<label class="uk-form-label" for="CSSTextShadowBlurRadius">模糊半径:</label>\
								<div class="uk-form-controls">\
									<input type="range" min="0" max="50" value="' + objShadow.blur_radius + '" class="CSSBoxShadowUpdater CSSBoxShadowBlurRadius" /> <input type="text" class="help-inline CSSGeneratorHelper CSSHelper" data-type="px" value="' + objShadow.blur_radius + 'px"/>\
								</div>\
							</div>\
							<div class="uk-form-row">\
								<label class="uk-form-label" for="CSSTextShadowBlurRadius">延伸:</label>\
								<div class="uk-form-controls">\
									<input type="range" min="-50" max="50" value="' + objShadow.spread_radius + '" class="CSSBoxShadowUpdater CSSBoxShadowSpreadRadius" /> <input type="text" class="help-inline CSSGeneratorHelper CSSHelper" data-type="px" value="' + objShadow.spread_radius + 'px"/>\
									<div class="uk-float-right">\
										<label class="label-checkbox small padded">\
											<input type="checkbox" value="inset" class="CSSBoxShadowUpdater CSSBoxShadowInset"' + strChecked + '/> Inset?\
										</label>\
									</div>\
								</div>\
							</div>\
							<div class="uk-form-row">\
								<label class="uk-form-label" for="CSSTextShadowColour">阴影颜色:</label>\
								<div class="uk-form-controls">\
									<input type="text" value="' + objShadow.shadow_color + '" class="color CSSBoxShadowUpdater CSSBoxShadowColour" />\
								</div>\
							</div>\
							<div class="uk-form-row">\
								<label class="uk-form-label" for="CSSTextShadowOpacity">透明度:</label>\
								<div class="uk-form-controls">\
									<input type="range" min="0" max="1" step="0.1" value="' + objShadow.opacity + '" class="CSSBoxShadowUpdater CSSBoxShadowOpacity" /> <input type="text" class="help-inline CSSGeneratorHelper CSSHelper" data-type="" value="' + objShadow.opacity + '"/>\
								</div>\
							</div>\
						</fieldset>\
					</form>\
				</div>\
			</li>');

			$("#box_shadow_switcher").append(objLi);

			var objColor = objLi.find(".CSSBoxShadowColour");
			var objJsColor = new jscolor.color(objColor[0],{});
			objJsColor.fromString(objShadow.shadow_color);

		},

		/**
		 * Get box shadow information and update the demo
		 */
		SetBoxShadow : function(blnIsInput)
		{

			var objActive = $("#CSSBoxShadowList").find(".uk-active");
			if(objActive.length === 0)
			{

				$("#CSSBoxShadowList").find("a").eq(parseFloat(localStorage["cssgenerator.box_shadow_switcher_active_sub_tab"])).trigger("click");

			}

			var arrBoxShadows = [];
			var strBoxShadow = '';
			var strHorizontal = '';
			var strVertical = '';
			var strBlur = '';
			var strSpread = '';
			var strColour = '';
			var strInset = '';
			var strIEColour = '';

			$("#box_shadow_switcher").find(".a-box-shadow").each(function(i,el)
			{

				strHorizontal = $(el).find(".CSSBoxShadowHorizontal").val();
				strVertical = $(el).find(".CSSBoxShadowVertical").val();
				strBlur = $(el).find(".CSSBoxShadowBlurRadius").val();
				strSpread = $(el).find(".CSSBoxShadowSpreadRadius").val();
				strColour = strIEColour = $(el).find(".CSSBoxShadowColour").val();
				strInset = $(el).find(".CSSBoxShadowInset").is(":checked") ? " inset" : "";
				var strOpacity = $(el).find(".CSSBoxShadowOpacity").val();

				var objBoxShadow = {
					"horizontal" : strHorizontal,
					"vertical" : strVertical,
					"blur_radius" : strBlur,
					"spread_radius" : strBlur,
					"shadow_color" : strColour,
					"opacity" : strOpacity,
					"inset" : strInset
				};

				arrBoxShadows.push(objBoxShadow);

				if(parseFloat(strOpacity) < 1)
				{

					var objColors = CSSGenerator.HexToRgba(strColour);

					strColour = 'rgba(' + objColors.r + ',' + objColors.g + ',' + objColors.b + ',' + strOpacity + ')';

				} else {

					strColour = '#' + strColour;

				}

				if(i > 0)
				{

					strBoxShadow+= ", " + CSSGenerator.FormatPixels(strVertical) + " " + CSSGenerator.FormatPixels(strHorizontal) + " " + CSSGenerator.FormatPixels(strBlur);

					if(strSpread !== "0")
					{

						strBoxShadow+= " " + CSSGenerator.FormatPixels(strSpread);

					}

					strBoxShadow+= " " + strColour;

				} else {

					strBoxShadow+= CSSGenerator.FormatPixels(strVertical) + " " + CSSGenerator.FormatPixels(strHorizontal) + " " + CSSGenerator.FormatPixels(strBlur);

					if(strSpread !== "0")
					{

						strBoxShadow+= " " + CSSGenerator.FormatPixels(strSpread);

					}

					strBoxShadow+= " " + strColour;

				}

				strBoxShadow+= strInset;

			});

			localStorage["cssgenerator.box_shadows"] = JSON.stringify(arrBoxShadows);

			var strDirection = CSSGenerator.GetAngle(parseFloat(strHorizontal),parseFloat(strVertical));

			$("#CSSGeneratorBoxShadowBox").css({ "box-shadow" : strBoxShadow });

			$("#CSSGeneratorOutput").html('-ms-filter: "progid:DXImageTransform.Microsoft.Shadow(Strength=' + strBlur + ', Direction=' + strDirection + ', Color=#' + strIEColour + ')";/*IE 8*/<br/>-moz-box-shadow: ' + strBoxShadow + ';/*FF 3.5+*/<br/>-webkit-box-shadow: ' + strBoxShadow + ';/*Saf3-4, Chrome, iOS 4.0.2-4.2, Android 2.3+*/<br/>box-shadow: ' + strBoxShadow + ';/* FF3.5+, Opera 9+, Saf1+, Chrome, IE10 */<br/>filter: progid:DXImageTransform.Microsoft.Shadow(Strength=' + strBlur + ', Direction=135, Color=#' + strIEColour + '); /*IE 5.5-7*/');

		},

		/**
		 * Setup stuff for CSS3 columns, nice and easy this one
		 */
		CSSColumns : function()
		{

			// Defaults

			if(localStorage["cssgenerator.column_count"] === undefined) localStorage["cssgenerator.column_count"] = "1";
			if(localStorage["cssgenerator.column_gap"] === undefined) localStorage["cssgenerator.column_gap"] = "0";
			if(localStorage["cssgenerator.column_rule"] === undefined) localStorage["cssgenerator.column_rule"] = "";

			// And event listeners

			$("#CSSTextColumnCount").on("input change", function()
			{

				localStorage["cssgenerator.column_count"] = $(this).val();
				$(this).next().val(localStorage["cssgenerator.column_count"]);
				CSSGenerator.SetColumns();

			}).val(localStorage["cssgenerator.column_count"]).next().val(localStorage["cssgenerator.column_count"]);

			$("#CSSTextColumnGap").on("input change", function()
			{

				localStorage["cssgenerator.column_gap"] = $(this).val();
				$(this).next().val(localStorage["cssgenerator.column_gap"]);
				CSSGenerator.SetColumns();

			}).val(localStorage["cssgenerator.column_gap"]).next().val(localStorage["cssgenerator.column_gap"]);

			$("#CSSTextColumnRule").on("change", function()
			{

				localStorage["cssgenerator.column_rule"] = $(this).val();
				$(this).next().val(localStorage["cssgenerator.column_rule"]);
				CSSGenerator.SetColumns();

			}).val(localStorage["cssgenerator.column_rule"]);

		},

		/**
		 * Apply those above values to our demo
		 */
		SetColumns : function()
		{

			var strColumnCount = localStorage["cssgenerator.column_count"];
			var strColumnGap = CSSGenerator.FormatPixels(localStorage["cssgenerator.column_gap"]);
			var strColumnRule = localStorage["cssgenerator.column_rule"];

			$("#CSSGeneratorColumns").css({"-webkit-column-count" : strColumnCount, "-webkit-column-gap" : strColumnGap, "-webkit-column-rule" : strColumnRule});

			$("#CSSGeneratorOutput").html('/* FF 3.5+*/<br/>-moz-column-count: ' + strColumnCount + ';<br/>-moz-column-gap: ' + strColumnGap + ';<br/>-moz-column-rule: ' + strColumnRule + ';<br/>/*Saf3, Chrome*/<br/>-webkit-column-count: ' + strColumnCount + ';<br/>-webkit-column-gap: ' + strColumnGap + ';<br/>-webkit-column-rule: ' + strColumnRule + ';<br/>column-count: ' + strColumnCount + ';<br/>column-gap: ' + strColumnGap + ';<br/>column-rule: ' + strColumnRule + ';');

		},

		/**
		 * Here things get a little more complicated, linear gradients
		 */
		CSSLinearGradients : function()
		{

			// Defaults

			if(localStorage["cssgenerator.linear_gradient_color_stops"] === undefined) localStorage["cssgenerator.linear_gradient_color_stops"] = JSON.stringify([{"color_stop" : "0","color" : "1301FE"},{"color_stop" : "100", "color" : "F4F60C"}]);
			if(localStorage["cssgenerator.linear_gradient_angle"] === undefined) localStorage["cssgenerator.linear_gradient_angle"] = 90;

			// Get our stops and create the elements for their settings

			var objStops = JSON.parse(localStorage["cssgenerator.linear_gradient_color_stops"]);

			$.each(objStops, function(i,el)
			{

				CSSGenerator.CreateGradientOption(i,el,"Linear");

			});

			// Event listeners

			$("#CSSGeneratorLinearGradientForm").on("input change", ".CSSTextGradientLinearColorStop", function()
			{

				var objEl = $(this);
				var objHelper = $(this).next();

				objHelper.val(CSSGenerator.FormatPercentage(objEl.val()));

				var objSettings = [];

				$(".CSSTextGradientLinearColorStop").each(function(e, el)
				{

					var intVal = $(this).val();
					var strColor = $(this).next().next().val();

					objSettings.push({"color_stop" : intVal, "color" : strColor});

				});

				localStorage["cssgenerator.linear_gradient_color_stops"] = JSON.stringify(objSettings);

				// Generate what we have in LS

				CSSGenerator.SetLinearGradient();

			});

			$("#CSSGeneratorLinearGradientForm").on("change", ".CSSTextGradientLinearColor", function()
			{

				var objSettings = [];

				$(".CSSTextGradientLinearColorStop").each(function(e, el)
				{

					var intVal = $(this).val();
					var strColor = $(this).next().next().val();

					objSettings.push({"color_stop" : intVal, "color" : strColor});

				});

				localStorage["cssgenerator.linear_gradient_color_stops"] = JSON.stringify(objSettings);

				// Generate what we have in LS

				CSSGenerator.SetLinearGradient();

			});

			$("#CSSGeneratorLinearGradientForm").on("blur", ".CSSTextGradientHelper", function()
			{

				var objEl = $(this);
				var intVal = parseInt(objEl.val());

				if(objEl.hasClass("CSSTextDegrees"))
				{

					if(intVal < 1)
					{

						intVal = 1;

					}

					if(intVal > 360)
					{

						intVal = 360;

					}

				} else {

					if(intVal < 0)
					{

						intVal = 0;

					}

					if(intVal > 100)
					{

						intVal = 100;

					}

				}

				objEl.prev().val(intVal).trigger("change");

				if(objEl.hasClass("CSSTextDegrees"))
				{

					objEl.val(CSSGenerator.FormatDegrees(objEl.val()));

				} else {

					objEl.val(CSSGenerator.FormatPercentage(objEl.val()));

				}

				CSSGenerator.SetLinearGradient();

			});

			$("#CSSTextGradientLinearAngle").on("input change", function()
			{

				localStorage["cssgenerator.linear_gradient_angle"] = $(this).val();
				$(this).next().val(localStorage["cssgenerator.linear_gradient_angle"] + '\xB0');

				// Generate what we have in LS

				CSSGenerator.SetLinearGradient();

			}).val(localStorage["cssgenerator.linear_gradient_angle"]).next().val(localStorage["cssgenerator.linear_gradient_angle"] + '\xB0');

			// Add button for new stop values

			$("#CSSGeneratorLinearGradientAdd").on("click", function(e)
			{

				e.preventDefault();

				CSSGenerator.CreateGradientOption($(".CSSTextGradientLinearColor").length,{"color_stop" : "100", "color" : "FFFFFF"},"Linear");

				var objSettings = [];

				$(".CSSTextGradientLinearColorStop").each(function(i, el)
				{

					var intVal = $(this).val();
					var strColor = $(this).next().next().val();

					objSettings.push({"color_stop" : intVal, "color" : strColor});

				});

				localStorage["cssgenerator.linear_gradient_color_stops"] = JSON.stringify(objSettings);

				// Generate what we have in LS

				CSSGenerator.SetLinearGradient();

			});

			// Remove a color stop

			$("#CSSGeneratorLinearGradientForm").on("click", ".CSSTextGradientRemoveStop", function(e)
			{

				e.preventDefault();

				$(this).closest(".uk-form-row").remove();

				var objSettings = [];

				$(".CSSTextGradientLinearColorStop").each(function(i, el)
				{

					var intVal = $(this).val();
					var strColor = $(this).next().next().val();

					objSettings.push({"color_stop" : intVal, "color" : strColor});

					// Reset counter values

					$(this).data("index", i).parent().prev().text('停止颜色 ' + (i+1) + ':');

				});

				localStorage["cssgenerator.linear_gradient_color_stops"] = JSON.stringify(objSettings);

				// Generate what we have in LS

				CSSGenerator.SetLinearGradient();

			});

		},

		/**
		 * Creates an option to append to the form for a colour stop
		 * @param {integer} i       The elements index
		 * @param {object} el      The elements values (from LS or default)
		 * @param {string} strType Linear or radial (we used the same function for both!)
		 */
		CreateGradientOption : function(i,el,strType)
		{

			var strHelper = strType === 'Striped' ? 'px' : '%';

			var strHtml = '<div class="uk-form-row">\
					<label class="uk-form-label" for="CSSTextGradient' + strType + 'ColorStop">停止颜色 ' + (i+1) + ':</label>\
					<div class="uk-form-controls">\
						<input type="range" min="0" max="100" class="CSSTextGradient' + strType + 'ColorStop" value="' + el.color_stop + '" data-index="' + i + '" /> <input type="text" class="help-inline CSSGeneratorHelper CSSTextGradientHelper" value="' + el.color_stop + strHelper + '"/> <input type="text" class="CSSTextGradient' + strType + 'Color help-inline CSSGeneratorHelper color" value="' + el.color + '" />';

			// We don't need to add a cross for less than 2

			if(i > 1)
			{

				strHtml+= '<a href="" title="删除停止颜色值" class="uk-button uk-button-danger uk-button-small CSSTextGradientRemoveStop">\xD7</a>';

			}

			strHtml+= '</div>\
				</div>';

			$("#CSSGenerator" + strType + "GradientForm").append(strHtml);

			// Apply jscolor

			var objColor = $("#CSSGenerator" + strType + "GradientForm").find(".color").last();
			var objJsColor = new jscolor.color(objColor[0],{});
			objJsColor.fromString(el.color);

		},

		/**
		 * Apply gradients to the demo, bit easier this bit
		 */
		SetLinearGradient : function()
		{

			var intAngle = localStorage["cssgenerator.linear_gradient_angle"];
			var objGradients = JSON.parse(localStorage["cssgenerator.linear_gradient_color_stops"]);

			var strGradient = intAngle + 'deg';
			var strOldGradient = intAngle + 'deg'; // Typical one browser does things differently

			$.each(objGradients,function(i, el)
			{

				strGradient+= ', #' + el.color + ' ' + CSSGenerator.FormatPercentage(el.color_stop);
				strOldGradient+= ', color-stop(' + CSSGenerator.FormatPercentage(el.color_stop) + ', ' + el.color + ')';

			});

			$("#CSSGeneratorLinearGradient").css("background", "-webkit-linear-gradient(" + strGradient + ")");

			$("#CSSGeneratorOutput").html('background: -moz-linear-gradient(' + strGradient + ');/* FF3.6+ */<br/>background: -webkit-gradient(linear, ' + strOldGradient + ');/* Chrome,Safari4+ */<br/>background: -webkit-linear-gradient(' + strGradient + ');/* Chrome10+,Safari5.1+ */<br/>background: -o-linear-gradient(' + strGradient + ');/* Opera 11.10+ */<br/>background: -ms-linear-gradient(' + strGradient + ');/* IE10+ */<br/>filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#1301FE\', endColorstr=\'#F4F60C\', GradientType=\'1\'); /* for IE */<br/>background: linear-gradient(' + strGradient + ');/* W3C */');

		},

		/**
		 * Basically the same as linear, but with some extra options
		 */
		CSSRadialGradients : function()
		{

			// Defaults

			if(localStorage["cssgenerator.radial_gradient_color_stops"] === undefined) localStorage["cssgenerator.radial_gradient_color_stops"] = JSON.stringify([{"color_stop" : "0","color" : "1301FE"},{"color_stop" : "100", "color" : "F4F60C"}]);
			if(localStorage["cssgenerator.radial_gradient_type"] === undefined) localStorage["cssgenerator.radial_gradient_type"] = "circle";
			if(localStorage["cssgenerator.radial_gradient_size"] === undefined) localStorage["cssgenerator.radial_gradient_size"] = "cover";
			if(localStorage["cssgenerator.radial_gradient_x"] === undefined) localStorage["cssgenerator.radial_gradient_x"] = 50;
			if(localStorage["cssgenerator.radial_gradient_y"] === undefined) localStorage["cssgenerator.radial_gradient_y"] = 50;

			// Create the color stops

			var objStops = JSON.parse(localStorage["cssgenerator.radial_gradient_color_stops"]);

			$.each(objStops, function(i,el)
			{

				CSSGenerator.CreateGradientOption(i,el,"Radial");

			});

			// And add the event listeners

			$("#CSSTextGradientRadialType").on("change", function()
			{

				localStorage["cssgenerator.radial_gradient_type"] = $(this).val();

				CSSGenerator.SetRadialGradient();

			}).val(localStorage["cssgenerator.radial_gradient_type"]);

			$("#CSSTextGradientRadialSize").on("change", function()
			{

				localStorage["cssgenerator.radial_gradient_size"] = $(this).val();

				CSSGenerator.SetRadialGradient();

			}).val(localStorage["cssgenerator.radial_gradient_size"]);

			$("#CSSTextGradientRadialX").on("input change", function()
			{

				localStorage["cssgenerator.radial_gradient_x"] = $(this).val();
				$(this).next().val(CSSGenerator.FormatPercentage($(this).val()));

				CSSGenerator.SetRadialGradient();

			}).val(localStorage["cssgenerator.radial_gradient_x"]).next().val(localStorage["cssgenerator.radial_gradient_x"]);

			$("#CSSTextGradientRadialY").on("input change", function()
			{

				localStorage["cssgenerator.radial_gradient_y"] = $(this).val();
				$(this).next().val(CSSGenerator.FormatPercentage($(this).val()));

				CSSGenerator.SetRadialGradient();

			}).val(localStorage["cssgenerator.radial_gradient_y"]).next().val(localStorage["cssgenerator.radial_gradient_y"]);

			$("#CSSGeneratorRadialGradientForm").on("input change", ".CSSTextGradientRadialColorStop", function()
			{

				var objEl = $(this);
				var objHelper = $(this).next();

				objHelper.val(CSSGenerator.FormatPercentage(objEl.val()));

				var objSettings = [];

				$(".CSSTextGradientRadialColorStop").each(function(e, el)
				{

					var intVal = $(this).val();
					var strColor = $(this).next().next().val();

					objSettings.push({"color_stop" : intVal, "color" : strColor});

				});

				localStorage["cssgenerator.radial_gradient_color_stops"] = JSON.stringify(objSettings);

				// Generate what we have in LS

				CSSGenerator.SetRadialGradient();

			});

			$("#CSSGeneratorRadialGradientForm").on("change", ".CSSTextGradientRadialColor", function()
			{

				var objSettings = [];

				$(".CSSTextGradientRadialColorStop").each(function(e, el)
				{

					var intVal = $(this).val();
					var strColor = $(this).next().next().val();

					objSettings.push({"color_stop" : intVal, "color" : strColor});

				});

				localStorage["cssgenerator.radial_gradient_color_stops"] = JSON.stringify(objSettings);

				// Generate what we have in LS

				CSSGenerator.SetRadialGradient();

			});

			$("#CSSGeneratorRadialGradientForm").on("blur", ".CSSTextGradientHelper", function()
			{

				var objEl = $(this);

				if(parseInt(objEl.val()) < 0)
				{

					objEl.val("0");

				}

				if(parseInt(objEl.val()) > 100)
				{

					objEl.val("100");

				}

				objEl.prev().val(objEl.val()).trigger("change");

				if(objEl.hasClass("CSSTextDegrees"))
				{

					objEl.val(CSSGenerator.FormatDegrees(objEl.val()));

				} else {

					objEl.val(CSSGenerator.FormatPercentage(objEl.val()));

				}

				CSSGenerator.SetRadialGradient();

			});

			// Add button for new stop values

			$("#CSSGeneratorRadialGradientAdd").on("click", function(e)
			{

				e.preventDefault();

				CSSGenerator.CreateGradientOption($(".CSSTextGradientRadialColor").length,{"color_stop" : "100", "color" : "FFFFFF"},"Radial");

				var objSettings = [];

				$(".CSSTextGradientRadialColorStop").each(function(i, el)
				{

					var intVal = $(this).val();
					var strColor = $(this).next().next().val();

					objSettings.push({"color_stop" : intVal, "color" : strColor});

				});

				localStorage["cssgenerator.radial_gradient_color_stops"] = JSON.stringify(objSettings);

				// Generate what we have in LS

				CSSGenerator.SetRadialGradient();

			});

			// Remove a color stop

			$("#CSSGeneratorRadialGradientForm").on("click", ".CSSTextGradientRemoveStop", function(e)
			{

				e.preventDefault();

				$(this).closest(".uk-form-row").remove();

				var objSettings = [];

				$(".CSSTextGradientRadialColorStop").each(function(i, el)
				{

					var intVal = $(this).val();
					var strColor = $(this).next().next().val();

					objSettings.push({"color_stop" : intVal, "color" : strColor});

					// Reset counter values

					$(this).data("index", i).parent().prev().text('停止颜色 ' + (i+1) + ':');

				});

				localStorage["cssgenerator.radial_gradient_color_stops"] = JSON.stringify(objSettings);

				// Generate what we have in LS

				CSSGenerator.SetRadialGradient();

			});

		},

		/**
		 * And apply the options above to our demo
		 */
		SetRadialGradient : function()
		{

			var strType = localStorage["cssgenerator.radial_gradient_type"];
			var strSize = localStorage["cssgenerator.radial_gradient_size"];
			var intPosX = localStorage["cssgenerator.radial_gradient_x"];
			var intPosY = localStorage["cssgenerator.radial_gradient_y"];
			var objGradients = JSON.parse(localStorage["cssgenerator.radial_gradient_color_stops"]);

			var strGradient = intPosX + '% ' + intPosY + '%, ' + strType + ' ' + strSize;

			$.each(objGradients,function(i, el)
			{

				strGradient+= ', #' + el.color + ' ' + CSSGenerator.FormatPercentage(el.color_stop);

			});

			$("#CSSGeneratorRadialGradient").css("background", "-webkit-radial-gradient(" + strGradient + ")");

			$("#CSSGeneratorOutput").html('background: -moz-radial-gradient(' + strGradient + ');/* FF3.6+ */<br/>background: -webkit-radial-gradient(' + strGradient + ');/* Chrome10+,Safari5.1+ */<br/>background: -o-radial-gradient(' + strGradient + ');/* Opera 11.10+ */<br/>background: -ms-radial-gradient(' + strGradient + ');/* IE10+ */<br/>background: radial-gradient(' + strGradient + ');/* W3C */');

		},

		/**
		 * Here things get a little more complicated, linear gradients
		 */
		CSSStripedGradients : function()
		{

			// Defaults

			if(localStorage["cssgenerator.striped_gradient_color_stops"] === undefined) localStorage["cssgenerator.striped_gradient_color_stops"] = JSON.stringify([
				{"color_stop" : "0","color" : "1301FE"},
				{"color_stop" : "10", "color" : "1301FE"},
				{"color_stop" : "10", "color" : "FFFFFF"},
				{"color_stop" : "20", "color" : "FFFFFF"}
			]);
			if(localStorage["cssgenerator.striped_gradient_angle"] === undefined) localStorage["cssgenerator.striped_gradient_angle"] = 90;

			// Get our stops and create the elements for their settings

			var objStops = JSON.parse(localStorage["cssgenerator.striped_gradient_color_stops"]);

			$.each(objStops, function(i,el)
			{

				CSSGenerator.CreateGradientOption(i,el,"Striped");

			});

			// Event listeners

			$("#CSSGeneratorStripedGradientForm").on("input change", ".CSSTextGradientStripedColorStop", function()
			{

				var objEl = $(this);
				var objHelper = $(this).next();

				objHelper.val(CSSGenerator.FormatPixels(objEl.val()));

				var objSettings = [];

				$(".CSSTextGradientStripedColorStop").each(function(e, el)
				{

					var intVal = $(this).val();
					var strColor = $(this).next().next().val();

					objSettings.push({"color_stop" : intVal, "color" : strColor});

				});

				localStorage["cssgenerator.striped_gradient_color_stops"] = JSON.stringify(objSettings);

				// Generate what we have in LS

				CSSGenerator.SetStripedGradient();

			});

			$("#CSSGeneratorStripedGradientForm").on("change", ".CSSTextGradientStripedColor", function()
			{

				var objSettings = [];

				$(".CSSTextGradientStripedColorStop").each(function(e, el)
				{

					var intVal = $(this).val();
					var strColor = $(this).next().next().val();

					objSettings.push({"color_stop" : intVal, "color" : strColor});

				});

				localStorage["cssgenerator.striped_gradient_color_stops"] = JSON.stringify(objSettings);

				// Generate what we have in LS

				CSSGenerator.SetStripedGradient();

			});

			$("#CSSGeneratorStripedGradientForm").on("blur", ".CSSTextGradientHelper", function()
			{

				var objEl = $(this);
				var intVal = parseInt(objEl.val());

				if(objEl.hasClass("CSSTextDegrees"))
				{

					if(intVal < 1)
					{

						intVal = 1;

					}

					if(intVal > 360)
					{

						intVal = 360;

					}

				} else {

					if(intVal < 0)
					{

						intVal = 0;

					}

					if(intVal > 100)
					{

						intVal = 100;

					}

				}

				objEl.prev().val(intVal).trigger("change");

				if(objEl.hasClass("CSSTextDegrees"))
				{

					objEl.val(CSSGenerator.FormatDegrees(objEl.val()));

				} else {

					objEl.val(CSSGenerator.FormatPixels(objEl.val()));

				}

				CSSGenerator.SetStripedGradient();

			});

			$("#CSSTextGradientStripedAngle").on("input change", function()
			{

				localStorage["cssgenerator.striped_gradient_angle"] = $(this).val();
				$(this).next().val(localStorage["cssgenerator.striped_gradient_angle"] + '\xB0');

				// Generate what we have in LS

				CSSGenerator.SetStripedGradient();

			}).val(localStorage["cssgenerator.striped_gradient_angle"]).next().val(localStorage["cssgenerator.striped_gradient_angle"] + '\xB0');

			// Add button for new stop values

			$("#CSSGeneratorStripedGradientAdd").on("click", function(e)
			{

				e.preventDefault();

				CSSGenerator.CreateGradientOption($(".CSSTextGradientStripedColor").length,{"color_stop" : "100", "color" : "FFFFFF"},"Striped");

				var objSettings = [];

				$(".CSSTextGradientLinearColorStop").each(function(i, el)
				{

					var intVal = $(this).val();
					var strColor = $(this).next().next().val();

					objSettings.push({"color_stop" : intVal, "color" : strColor});

				});

				localStorage["cssgenerator.striped_gradient_color_stops"] = JSON.stringify(objSettings);

				// Generate what we have in LS

				CSSGenerator.SetStripedGradient();

			});

			// Remove a color stop

			$("#CSSGeneratorStripedGradientForm").on("click", ".CSSTextGradientRemoveStop", function(e)
			{

				e.preventDefault();

				$(this).closest(".uk-form-row").remove();

				var objSettings = [];

				$(".CSSTextGradientStripedColorStop").each(function(i, el)
				{

					var intVal = $(this).val();
					var strColor = $(this).next().next().val();

					objSettings.push({"color_stop" : intVal, "color" : strColor});

					// Reset counter values

					$(this).data("index", i).parent().prev().text('停止颜色 ' + (i+1) + ':');

				});

				localStorage["cssgenerator.striped_gradient_color_stops"] = JSON.stringify(objSettings);

				// Generate what we have in LS

				CSSGenerator.SetStripedGradient();

			});

		},

		/**
		 * Apply gradients to the demo, bit easier this bit
		 */
		SetStripedGradient : function()
		{

			var intAngle = localStorage["cssgenerator.striped_gradient_angle"];
			var objGradients = JSON.parse(localStorage["cssgenerator.striped_gradient_color_stops"]);

			var strGradient = intAngle + 'deg';
			var strOldGradient = intAngle + 'deg'; // Typical one browser does things differently

			$.each(objGradients,function(i, el)
			{

				if(i === 0)
				{

					strGradient+= ', #' + el.color;

				}

				strGradient+= ', #' + el.color + ' ' + CSSGenerator.FormatPixels(el.color_stop);
				strOldGradient+= ', color-stop(' + CSSGenerator.FormatPixels(el.color_stop) + ', ' + el.color + ')';

			});

			$("#CSSGeneratorStripedGradient").css("background", "repeating-linear-gradient(" + strGradient + ")");

			$("#CSSGeneratorOutput").html('background: -moz-repeating-linear-gradient(' + strGradient + ');/* FF3.6+ */<br/>background: -webkit-repeating-gradient(linear, ' + strOldGradient + ');/* Chrome,Safari4+ */<br/>background: -webkit-repeating-linear-gradient(' + strGradient + ');/* Chrome10+,Safari5.1+ */<br/>background: -o-repeating-linear-gradient(' + strGradient + ');/* Opera 11.10+ */<br/>background: -ms-linear-gradient(' + strGradient + ');/* IE10+ */<br/>filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#1301FE\', endColorstr=\'#F4F60C\', GradientType=\'1\'); /* for IE */<br/>background: repeating-linear-gradient(' + strGradient + ');/* W3C */');

		},

		/**
		 * Personally, I use this all the time
		 * Inspired by http://cssarrowplease.com - an extremely handy site!
		 * Given a couple of extra options for positioning in other places
		 *
		 * @todo	- Apply an offset so you can put the arrow anywhere
		 */
		CSSArrows : function()
		{

			// Default options

			if(localStorage["cssgenerator.arrow_position"] === undefined) localStorage["cssgenerator.arrow_position"] = "top";
			if(localStorage["cssgenerator.arrow_size"] === undefined) localStorage["cssgenerator.arrow_size"] = "30";
			if(localStorage["cssgenerator.arrow_background"] === undefined) localStorage["cssgenerator.arrow_background"] = "88b7d5";
			if(localStorage["cssgenerator.arrow_border_color"] === undefined) localStorage["cssgenerator.arrow_border_color"] = "c2e1f5";
			if(localStorage["cssgenerator.arrow_border_width"] === undefined) localStorage["cssgenerator.arrow_border_width"] = "4";

			// Offset stuff

			if(localStorage["cssgenerator.arrow_offset"] === undefined) localStorage["cssgenerator.arrow_offset"] = "0";

			$("#CSSTextArrowPosition").on("change", function()
			{

				localStorage["cssgenerator.arrow_position"] = $(this).val();

				CSSGenerator.SetArrow();

			}).val(localStorage["cssgenerator.arrow_position"]);

			$("#CSSTextArrowBackground").on("change", function()
			{

				localStorage["cssgenerator.arrow_background"] = $(this).val();

				CSSGenerator.SetArrow();

			}).val(localStorage["cssgenerator.arrow_background"]);

			$("#CSSTextArrowBorderColor").on("change", function()
			{

				localStorage["cssgenerator.arrow_border_color"] = $(this).val();

				CSSGenerator.SetArrow();

			}).val(localStorage["cssgenerator.arrow_border_color"]);

			$("#CSSTextArrowSize").on("input change", function()
			{

				localStorage["cssgenerator.arrow_size"] = $(this).val();
				$(this).next().val(CSSGenerator.FormatPixels($(this).val()));

				CSSGenerator.SetArrow();

			}).val(localStorage["cssgenerator.arrow_size"]).next().val(CSSGenerator.FormatPixels(localStorage["cssgenerator.arrow_size"]));

			$("#CSSTextArrowBorderWidth").on("input change", function()
			{

				localStorage["cssgenerator.arrow_border_width"] = $(this).val();
				$(this).next().val(CSSGenerator.FormatPixels($(this).val()));

				CSSGenerator.SetArrow();

			}).val(localStorage["cssgenerator.arrow_border_width"]).next().val(CSSGenerator.FormatPixels(localStorage["cssgenerator.arrow_border_width"]));

			$("#CSSTextArrowOffset").on("input change", function()
			{

				localStorage["cssgenerator.arrow_offset"] = $(this).val();
				$(this).next().val(CSSGenerator.FormatPixels($(this).val()));

				CSSGenerator.SetArrow();

			}).val(localStorage["cssgenerator.arrow_offset"]).next().val(CSSGenerator.FormatPixels(localStorage["cssgenerator.arrow_offset"]));



		},

		/**
		 * Again, using the options from our form update the demo arrow with
		 * the values in LS
		 */
		SetArrow : function()
		{

			var strPosition = localStorage["cssgenerator.arrow_position"];
			var intSize = parseInt(localStorage["cssgenerator.arrow_size"]);
			var strBackground = localStorage["cssgenerator.arrow_background"];
			var strBorder = localStorage["cssgenerator.arrow_border_color"];
			var intWidth = parseInt(localStorage["cssgenerator.arrow_border_width"]);
			var intOffset = parseInt(localStorage["cssgenerator.arrow_offset"]);
			var strBorderPos = "bottom";
			var strMargin = "left";
			var intDiff = intSize + intWidth + 1;
			var intAfterMargin = '-' + intSize;
			var intBeforeMargin = '-' + intSize;
			var strCssPosition = '';

			switch(strPosition)
			{

				case "topright":

					strCssPosition+= '	bottom: 100%;<br/>'+
'	right: ' + CSSGenerator.FormatPixels(intOffset) + ';<br/>';
					strBorderPos = "bottom";
					strMargin = "right";
					intAfterMargin = '0';
					intBeforeMargin = '-' + (intWidth + 1);

					break;

				case "top":

					strCssPosition+= '	bottom: 100%;<br/>'+
'	left: 50%;<br/>';
					strBorderPos = "bottom";
					strMargin = "left";
					intAfterMargin = '-' + intSize;
					intBeforeMargin = '-' + intDiff;

					break;

				case "topleft":

					strCssPosition+= '	bottom: 100%;<br/>'+
'	left: ' + CSSGenerator.FormatPixels(intOffset) + ';<br/>';
					strBorderPos = "bottom";
					strMargin = "left";
					intAfterMargin = '0';
					intBeforeMargin = '-' + (intWidth + 1);

					break;

				case "lefttop":

					strCssPosition+= '	right: 100%;<br/>'+
'	top: ' + CSSGenerator.FormatPixels(intOffset) + ';<br/>';
					strBorderPos = "right";
					strMargin = "top";
					intAfterMargin = '0';
					intBeforeMargin = '-' + (intWidth + 1);

					break;

				case "left":

					strCssPosition+= '	right: 100%;<br/>'+
'	top: 50%;<br/>';
					strBorderPos = "right";
					strMargin = "top";
					intAfterMargin = '-' + intSize;
					intBeforeMargin = '-' + intDiff;

					break;

				case "leftbottom":

					strCssPosition+= '	right: 100%;<br/>'+
'	bottom: ' + CSSGenerator.FormatPixels(intOffset) + ';<br/>';
					strBorderPos = "right";
					strMargin = "bottom";
					intAfterMargin = '0';
					intBeforeMargin = '-' + (intWidth + 1);

					break;

				case "bottomleft":

					strCssPosition+= '	top: 100%;<br/>'+
'	left: ' + CSSGenerator.FormatPixels(intOffset) + ';<br/>';
					strBorderPos = "top";
					strMargin = "left";
					intAfterMargin = '0';
					intBeforeMargin = '-' + (intWidth + 1);

					break;

				case "bottom":

					strCssPosition+= '	top: 100%;<br/>'+
'	left: 50%;<br/>';
					strBorderPos = "top";
					strMargin = "left";
					intAfterMargin = '-' + intSize;
					intBeforeMargin = '-' + intDiff;

					break;

				case "bottomright":

					strCssPosition+= '	top: 100%;<br/>'+
'	right: ' + CSSGenerator.FormatPixels(intOffset) + ';<br/>';
					strBorderPos = "top";
					strMargin = "right";
					intAfterMargin = '0';
					intBeforeMargin = '-' + (intWidth + 1);

					break;

				case "rightbottom":

					strCssPosition+= '	left: 100%;<br/>'+
'	bottom: ' + CSSGenerator.FormatPixels(intOffset) + ';<br/>';
					strBorderPos = "left";
					strMargin = "bottom";
					intAfterMargin = '0';
					intBeforeMargin = '-' + (intWidth + 1);

					break;

				case "right":

					strCssPosition+= '	left: 100%;<br/>'+
'	top: 50%;<br/>';
					strBorderPos = "left";
					strMargin = "top";
					intAfterMargin = '-' + intSize;
					intBeforeMargin = '-' + intDiff;

					break;

				case "righttop":

					strCssPosition+= '	left: 100%;<br/>'+
'	top: ' + CSSGenerator.FormatPixels(intOffset) + ';<br/>';
					strBorderPos = "left";
					strMargin = "top";
					intAfterMargin = '0';
					intBeforeMargin = '-' + (intWidth + 1);

					break;

			}

			var strCss = '#CSSGeneratorArrow {<br/>'+
'	position: relative;<br/>'+
'	background: #' + strBackground + ';<br/>'+
'';

			if(intWidth > 0)
			{

				strCss+= '	border: ' + intWidth + 'px solid #' + strBorder + ';<br/>';

			}

			strCss+= '}<br/>';

			if(intWidth === 0)
			{

				strCss+= '#CSSGeneratorArrow:after {<br/>'+ strCssPosition +
'	border: solid transparent;<br/>'+
'	content: " ";<br/>'+
'	height: 0;<br/>'+
'	width: 0;<br/>'+
'	position: absolute;<br/>'+
'	pointer-events: none;<br/>'+
'	border-color: rgba(136, 183, 213, 0);<br/>'+
'	border-' + strBorderPos + '-color: #' + strBackground + ';<br/>'+
'	border-width: ' + intSize + 'px;<br/>'+
'	margin-' + strMargin + ': ' + intAfterMargin + 'px;<br/>'+
'}';

			} else {

				strCss+= '#CSSGeneratorArrow:after,<br/>'+
'#CSSGeneratorArrow:before {<br/>'+ strCssPosition +
'	border: solid transparent;<br/>'+
'	content: " ";<br/>'+
'	height: 0;<br/>'+
'	width: 0;<br/>'+
'	position: absolute;<br/>'+
'	pointer-events: none;<br/>'+
'}<br/>'+
'#CSSGeneratorArrow:after {<br/>'+
'	border-color: rgba(136, 183, 213, 0);<br/>'+
'	border-' + strBorderPos + '-color: #' + strBackground + ';<br/>'+
'	border-width: ' + intSize + 'px;<br/>'+
'	margin-' + strMargin + ': ' + intAfterMargin + 'px;<br/>'+
'}<br/>'+
'#CSSGeneratorArrow:before {<br/>'+
'	border-color: rgba(194, 225, 245, 0);<br/>'+
'	border-' + strBorderPos + '-color: #' + strBorder + ';<br/>'+
'	border-width: ' + intDiff + 'px;<br/>'+
'	margin-' + strMargin + ': ' + intBeforeMargin + 'px;<br/>'+
'}';

			}

			$("#CSSGeneratorOutput").html(strCss.replace(/\#CSSGeneratorArrow/g, ".cssarrow"));
			$("#CSSGeneratorStyleTag").text(strCss.replace(/(<br\/>)+/g, ""));

		},

		/**
		 * All the fun of the transition
		 */
		CSSTransitions : function()
		{

			if(localStorage["cssgenerator.transition_positions"] === undefined) localStorage["cssgenerator.transition_positions"] = JSON.stringify([
				{"type" : "top", "to" : "0", "active" : "0"},
				{"type" : "right", "to" : "0", "active" : "0"},
				{"type" : "bottom", "to" : "0", "active" : "0"},
				{"type" : "left", "to" : "0", "active" : "0"}
			]);
			if(localStorage["cssgenerator.transition_marpads"] === undefined) localStorage["cssgenerator.transition_marpads"] = JSON.stringify([
				{"type" : "margin", "to" : "0", "active" : "0"},
				{"type" : "padding", "to" : "0", "active" : "0"},
				{"type" : "border-width", "to" : "0", "active" : "0"},
				{"type" : "border-radius", "to" : "0", "active" : "0"}
			]);
			if(localStorage["cssgenerator.transition_colors"] === undefined) localStorage["cssgenerator.transition_colors"] = JSON.stringify([
				{"type" : "color", "to" : "FFFFFF", "active" : "0"},
				{"type" : "background-color", "to" : "FFFFFF", "active" : "0"},
				{"type" : "border-color", "to" : "FFFFFF", "active" : "0"}
			]);
			if(localStorage["cssgenerator.transition_duration"] === undefined) localStorage["cssgenerator.transition_duration"] = 1;
			if(localStorage["cssgenerator.transition_easing"] === undefined) localStorage["cssgenerator.transition_easing"] = 'ease';
			if(localStorage["cssgenerator.transition_beziers"] === undefined) localStorage["cssgenerator.transition_beziers"] = JSON.stringify(['0','0','0','0']);

			var arrPositions = JSON.parse(localStorage["cssgenerator.transition_positions"]);
			var arrMarPads = JSON.parse(localStorage["cssgenerator.transition_marpads"]);
			var arrColors = JSON.parse(localStorage["cssgenerator.transition_colors"]);
			var arrBeziers = JSON.parse(localStorage["cssgenerator.transition_beziers"]);

			var strEasing = localStorage["cssgenerator.transition_easing"];

			$(".CSSTextTransitionAmount").on("input change", function()
			{

				var objEl = $(this);
				objEl.next().val(CSSGenerator.FormatPixels(objEl.val()));

				CSSGenerator.SetTransitionTypes();

			});

			/*

			$("#CSSTextTransitionPositionAmount").on("change", function()
			{

				var objEl = $(this);
				var objType = objEl.prev();
				objEl.next().val(CSSGenerator.FormatPixels(objEl.val()));

				localStorage["cssgenerator.transition_position"] = JSON.stringify({"type" : objType.val(), "amount" : objEl.val()});

				CSSGenerator.SetTransitions();

			}).val(objPosition.amount).next().val(CSSGenerator.FormatPixels(objPosition.amount));

			$("#CSSTextTransitionMarPad").on("change", function()
			{

				var objEl = $(this);
				var objAmount = objEl.next();

				localStorage["cssgenerator.transition_marpad"] = JSON.stringify({"type" : objEl.val(), "amount" : objAmount.val()});

				CSSGenerator.SetTransitions();

			}).val(objMarPad.type);

			$("#CSSTextTransitionMarPadAmount").on("change", function()
			{

				var objEl = $(this);
				var objType = objEl.prev();
				objEl.next().val(CSSGenerator.FormatPixels(objEl.val()));

				localStorage["cssgenerator.transition_marpad"] = JSON.stringify({"type" : objType.val(), "amount" : objEl.val()});

				CSSGenerator.SetTransitions();

			}).val(objMarPad.amount).next().val(CSSGenerator.FormatPixels(objMarPad.amount));

			*/

			$(".CSSTransitionCheckbox").on("click", function()
			{

				CSSGenerator.SetTransitionTypes();

			});

			$(".CSSTextTransitionColor").on("change", function()
			{

				CSSGenerator.SetTransitionTypes();

			});

			// Set the positions up from those saved

			$.each(arrPositions, function(i,objPosition)
			{

				var objCheckbox = $(".CSSTransitionCheckbox[data-transition='" + objPosition.type + "']");
				var objSlider = objCheckbox.next();
				var objValInput = objSlider.next();
				var objInput = objCheckbox.find(":first-child");
				if(objPosition.active === "1")
				{

					objInput.prop("checked", true);

				} else {

					objInput.prop("checked", false);

				}

				objSlider.val(objPosition.to);
				objValInput.val(CSSGenerator.FormatPixels(objPosition.to));

			});

			// Set the positions up from those saved

			$.each(arrMarPads, function(i,objMarPad)
			{

				var objCheckbox = $(".CSSTransitionCheckbox[data-transition='" + objMarPad.type + "']");
				var objSlider = objCheckbox.next();
				var objValInput = objSlider.next();
				var objInput = objCheckbox.find(":first-child");
				if(objMarPad.active === "1")
				{

					objInput.prop("checked", true);

				} else {

					objInput.prop("checked", false);

				}

				objSlider.val(objMarPad.to);
				objValInput.val(CSSGenerator.FormatPixels(objMarPad.to));

			});

			// Set the colors up from those saved

			$.each(arrColors, function(i,objColor)
			{

				var objCheckbox = $(".CSSTransitionCheckbox[data-transition='" + objColor.type + "']");
				var objColorInput = objCheckbox.next();
				var objInput = objCheckbox.find(":first-child");
				if(objColor.active === "1")
				{

					objInput.prop("checked", true);

				} else {

					objInput.prop("checked", false);

				}

				objColorInput.val(objColor.to);

			});

			// Hide the color picker if colour is set to none

			if(strEasing !== "cubic-bezier")
			{

				$("#CSSTextTransitionBeziers").hide();

			}

			$("#CSSTextTransitionDuration").on("input change", function()
			{

				var objEl = $(this);
				objEl.next().val(objEl.val() + 's');

				localStorage["cssgenerator.transition_duration"] = objEl.val();

				CSSGenerator.SetTransitions();

			}).val(localStorage["cssgenerator.transition_duration"]).next().val(localStorage["cssgenerator.transition_duration"] + 's');

			$("#CSSTextTransitionEasing").on("change", function()
			{

				var objEl = $(this);

				localStorage["cssgenerator.transition_easing"] = objEl.val();

				CSSGenerator.SetTransitions();

				if(objEl.val() === "cubic-bezier")
				{

					$("#CSSTextTransitionBeziers").show();

				} else {

					$("#CSSTextTransitionBeziers").hide();

				}

			}).val(localStorage["cssgenerator.transition_easing"]);

			$(".CSSTextCubicBezier").on("change", function()
			{

				var objEl = $(this);
				var arrVals = [];

				$(".CSSTextCubicBezier").each(function(i,el)
				{

					var intVal = $(el).val();

					if(intVal < 0)
					{

						intVal = 0;

					}

					if(intVal > 2)
					{

						intVal = 2;

					}

					arrVals.push(intVal);

				});

				localStorage["cssgenerator.transition_beziers"] = JSON.stringify(arrVals);

				CSSGenerator.SetTransitions();

			});

			$(".CSSTextCubicBezier").each(function(i,el)
			{

				$(el).val(arrBeziers[i]);

			});

		},

		SaveTransition : function(objEl)
		{

			var objLabel = objEl.prev();
			var strType = objLabel.data("transition");
			var strKey = objLabel.data("ls-key");
			objEl.next().val(CSSGenerator.FormatPixels(objEl.val()));

			var arrOptions = JSON.parse(localStorage["cssgenerator.transition_" + strKey]);
			$.each(arrOptions, function(i,el)
			{

				if(el.type === strType)
				{



				}

			});

			CSSGenerator.SetTransitions();

		},

		SetTransitionTypes : function()
		{

			var arrOptions = [];
			var strKey = '';

			$(".CSSTransitionCheckbox").each(function(i,el)
			{

				var objLabel = $(this);
				var objInput = objLabel.find(":first-child");
				var objColor = objLabel.next();
				var strType = objLabel.data("transition");
				if(strKey === '')
				{

					strKey = objLabel.data("ls-key");

				} else if(strKey !== objLabel.data("ls-key"))
				{

					localStorage["cssgenerator.transition_" + strKey] = JSON.stringify(arrOptions);
					arrOptions = [];
					strKey = objLabel.data("ls-key");

				} else {

					localStorage["cssgenerator.transition_" + strKey] = JSON.stringify(arrOptions);

				}

				if(objInput.is(":checked"))
				{

					arrOptions.push({"type" : strType, "to" : objColor.val(), "active" : "1"});

				} else {

					arrOptions.push({"type" : strType, "to" : objColor.val(), "active" : "0"});

				}

			});

			CSSGenerator.SetTransitions();

		},

		SetTransitions : function()
		{

			var arrPositions = JSON.parse(localStorage["cssgenerator.transition_positions"]);
			var arrMarPads = JSON.parse(localStorage["cssgenerator.transition_marpads"]);
			var arrColors = JSON.parse(localStorage["cssgenerator.transition_colors"]);
			var intDuration = localStorage["cssgenerator.transition_duration"];
			var strEasing = localStorage["cssgenerator.transition_easing"];

			if(strEasing === "cubic-bezier")
			{

				var arrBeziers = JSON.parse(localStorage["cssgenerator.transition_beziers"]);
				strEasing = "cubic-bezier(" + arrBeziers[0] + "," + arrBeziers[1] + "," + arrBeziers[2] + "," + arrBeziers[3] + ")";

			}

			var strCss = '#CSSGeneratorTransitionBox {<br/>'+
'	position: relative;<br/>';
			var strProperties = '';
			var strHovers = '';

			$.each(arrPositions, function(i,objPosition)
			{

				if(objPosition.active === "1")
				{

					strProperties+= (strProperties === '' ? '' : ', ') + objPosition.type + ' ' + intDuration +'s ' + strEasing;
					strHovers+= '	' + objPosition.type + ': ' + objPosition.to + 'px;<br/>';

					switch(objPosition.type)
					{

						case "top":

							strCss+= '	top: 0;<br/>';

							break;

						case "right":

							strCss+= '	right: 0;<br/>';

							break;

						case "bottom":

							strCss+= '	bottom: 0;<br/>';

							break;

						case "left":

							strCss+= '	left: 0;<br/>';

							break;

					}

				}

			});

			$.each(arrMarPads, function(i,objMarPad)
			{

				if(objMarPad.active === "1")
				{

					strProperties+= (strProperties === '' ? '' : ', ') + objMarPad.type + ' ' + intDuration +'s ' + strEasing;
					strHovers+= '	' + objMarPad.type + ': ' + objMarPad.to + 'px;<br/>';

					switch(objMarPad.type)
					{

						case "margin":

							strCss+= '	margin: 0;<br/>';

							break;

						case "padding":

							strCss+= '	padding: 0;<br/>';

							break;

						case "border-width":

							strCss+= '	border: 0 solid #000;<br/>';

							break;

						case "border-radius":

							strCss+= '	border-radius: 0;<br/>';

							break;

					}

				}

			});

			$.each(arrColors, function(i,objColor)
			{

				if(objColor.active === "1")
				{

					strProperties+= (strProperties === '' ? '' : ', ') + objColor.type + ' ' + intDuration +'s ' + strEasing;
					strHovers+= '	' + objColor.type + ': #' + objColor.to + ';<br/>';

					switch(objColor.type)
					{

						case "border-color":

							strCss+= objMarPad.type === 'border-width' ? '	border: 0 solid #000;<br/>' : '	border: 2px solid #000;<br/>';

							break;

					}

				}

			});

			if(strProperties !== '')
			{

				strCss+= ''+
'	-webkit-transition: ' + strProperties + ';<br/>'+
'	-moz-transition: ' + strProperties + ';<br/>'+
'	-o-transition: ' + strProperties + ';<br/>'+
'	transition: ' + strProperties + ';<br/>'+
'}<br/>'+
'#CSSGeneratorTransitionBox:hover {<br/>'+
strHovers;

			}

			strCss+=
'}';

			$("#CSSGeneratorOutput").html(strCss.replace(/\#CSSGeneratorTransitionBox/g, ".elem"));
			$("#CSSGeneratorStyleTag").text(strCss.replace(/(<br\/>)+/g, ""));

		},

		/**
		 * Setup our nice new CSS filters
		 */
		CSSFilters : function()
		{

			// Check current settings/apply defaults

			if(localStorage["cssgenerator.filter_grayscale"] === undefined) localStorage["cssgenerator.filter_grayscale"] = '0';
			if(localStorage["cssgenerator.filter_sepia"] === undefined) localStorage["cssgenerator.filter_sepia"] = '0';
			if(localStorage["cssgenerator.filter_blur"] === undefined) localStorage["cssgenerator.filter_blur"] = '0';
			if(localStorage["cssgenerator.filter_brightness"] === undefined) localStorage["cssgenerator.filter_brightness"] = '100';
			if(localStorage["cssgenerator.filter_hue_rotate"] === undefined) localStorage["cssgenerator.filter_hue_rotate"] = '0';
			if(localStorage["cssgenerator.filter_drop_shadow"] === undefined) localStorage["cssgenerator.filter_drop_shadow"] = '0';
			if(localStorage["cssgenerator.filter_drop_shadow_x"] === undefined) localStorage["cssgenerator.filter_drop_shadow_x"] = '3';
			if(localStorage["cssgenerator.filter_drop_shadow_y"] === undefined) localStorage["cssgenerator.filter_drop_shadow_y"] = '3';
			if(localStorage["cssgenerator.filter_drop_shadow_spread"] === undefined) localStorage["cssgenerator.filter_drop_shadow_spread"] = '3';
			if(localStorage["cssgenerator.filter_drop_shadow_color"] === undefined) localStorage["cssgenerator.filter_drop_shadow_color"] = '000000';

			// Events listeners for all the sections

			$("#CSSTextFilterGrayscale").on("input change", function()
			{

				var objEl = $(this);
				var intVal = objEl.val();
				objEl.next().val(intVal);
				localStorage["cssgenerator.filter_grayscale"] = intVal;

				CSSGenerator.SetFilters();

			}).val(localStorage["cssgenerator.filter_grayscale"]).next().val(localStorage["cssgenerator.filter_grayscale"]);

			$("#CSSTextFilterSepia").on("input change", function()
			{

				var objEl = $(this);
				var intVal = objEl.val();
				objEl.next().val(intVal);
				localStorage["cssgenerator.filter_sepia"] = intVal;

				CSSGenerator.SetFilters();

			}).val(localStorage["cssgenerator.filter_sepia"]).next().val(localStorage["cssgenerator.filter_sepia"]);

			$("#CSSTextFilterBlur").on("input change", function()
			{

				var objEl = $(this);
				var intVal = objEl.val();
				objEl.next().val(CSSGenerator.FormatPixels(intVal));
				localStorage["cssgenerator.filter_blur"] = intVal;

				CSSGenerator.SetFilters();

			}).val(localStorage["cssgenerator.filter_blur"]).next().val(CSSGenerator.FormatPixels(localStorage["cssgenerator.filter_blur"]));

			$("#CSSTextFilterBrightness").on("input change", function()
			{

				var objEl = $(this);
				var intVal = objEl.val();
				objEl.next().val(CSSGenerator.FormatPercentage(intVal));
				localStorage["cssgenerator.filter_brightness"] = intVal;

				CSSGenerator.SetFilters();

			}).val(localStorage["cssgenerator.filter_brightness"]).next().val(CSSGenerator.FormatPercentage(localStorage["cssgenerator.filter_brightness"]));

			$("#CSSTextFilterHueRotate").on("input change", function()
			{

				var objEl = $(this);
				var intVal = objEl.val();
				objEl.next().val(CSSGenerator.FormatDegrees(intVal));
				localStorage["cssgenerator.filter_hue_rotate"] = intVal;

				CSSGenerator.SetFilters();

			}).val(localStorage["cssgenerator.filter_hue_rotate"]).next().val(CSSGenerator.FormatDegrees(localStorage["cssgenerator.filter_hue_rotate"]));

			$("#CSSTextFilterHorizontal").on("input change", function()
			{

				var objEl = $(this);
				var intVal = objEl.val();
				objEl.next().val(CSSGenerator.FormatPixels(intVal));
				localStorage["cssgenerator.filter_drop_shadow_x"] = intVal;

				CSSGenerator.SetFilters();

			}).val(localStorage["cssgenerator.filter_drop_shadow_x"]).next().val(CSSGenerator.FormatPixels(localStorage["cssgenerator.filter_drop_shadow_x"]));

			$("#CSSTextFilterVertical").on("input change", function()
			{

				var objEl = $(this);
				var intVal = objEl.val();
				objEl.next().val(intVal);
				localStorage["cssgenerator.filter_drop_shadow_y"] = intVal;

				CSSGenerator.SetFilters();

			}).val(localStorage["cssgenerator.filter_drop_shadow_y"]).next().val(CSSGenerator.FormatPixels(localStorage["cssgenerator.filter_drop_shadow_y"]));

			$("#CSSTextFilterBlurRadius").on("input change", function()
			{

				var objEl = $(this);
				var intVal = objEl.val();
				objEl.next().val(CSSGenerator.FormatPixels(intVal));
				localStorage["cssgenerator.filter_drop_shadow_spread"] = intVal;

				CSSGenerator.SetFilters();

			}).val(localStorage["cssgenerator.filter_drop_shadow_spread"]).next().val(CSSGenerator.FormatPixels(localStorage["cssgenerator.filter_drop_shadow_spread"]));

			$("#CSSTextFilterBlurColor").on("change", function()
			{

				var objEl = $(this);
				var intVal = objEl.val();
				objEl.next().val(intVal);
				localStorage["cssgenerator.filter_drop_shadow_color"] = intVal;

				CSSGenerator.SetFilters();

			}).val(localStorage["cssgenerator.filter_drop_shadow_color"]).next().val(localStorage["cssgenerator.filter_drop_shadow_color"]);

			$("#CSSTextFilterDropShadow").on("click", function(e)
			{

				e.preventDefault();

				var objEl = $(this);

				localStorage["cssgenerator.filter_drop_shadow"] = localStorage["cssgenerator.filter_drop_shadow"] === "1" ? "0" : "1";
				objEl.text(localStorage["cssgenerator.filter_drop_shadow"] === "1" ? "开" : "关");
				objEl.removeClass("uk-button-danger uk-button-success");
				objEl.addClass(localStorage["cssgenerator.filter_drop_shadow"] === "1" ? "uk-button-success" : "uk-button-danger");

				CSSGenerator.SetFilters();

			})
			.addClass(localStorage["cssgenerator.filter_drop_shadow"] === "1" ? "uk-button-success" : "uk-button-danger")
			.text(localStorage["cssgenerator.filter_drop_shadow"] === "1" ? "开" : "关");

		},

		SetFilters : function()
		{

			var intGrayscale = parseFloat(localStorage["cssgenerator.filter_grayscale"]);
			var intSepia = parseFloat(localStorage["cssgenerator.filter_sepia"]);
			var intBlur = parseFloat(localStorage["cssgenerator.filter_blur"]);
			var intBrightness = parseFloat(localStorage["cssgenerator.filter_brightness"]);
			var intHueRotate = parseFloat(localStorage["cssgenerator.filter_hue_rotate"]);
			var blnDropShadow = localStorage["cssgenerator.filter_drop_shadow"];
			var strDropShadow = CSSGenerator.FormatPixels(localStorage["cssgenerator.filter_drop_shadow_x"]) + ' ' + CSSGenerator.FormatPixels(localStorage["cssgenerator.filter_drop_shadow_y"]) + ' ' + CSSGenerator.FormatPixels(localStorage["cssgenerator.filter_drop_shadow_spread"]) + ' #' + localStorage["cssgenerator.filter_drop_shadow_color"];
			var strFilter = "";

			if(intGrayscale > 0)
			{

				strFilter+= ' grayscale(' + intGrayscale + ')';

			}

			if(intSepia > 0)
			{

				strFilter+= ' sepia(' + intSepia + ')';

			}

			if(intBlur > 0)
			{

				strFilter+= ' blur(' + CSSGenerator.FormatPixels(intBlur) + ')';

			}

			if(intBrightness !== 100)
			{

				strFilter+= ' brightness(' + CSSGenerator.FormatPercentage(intBrightness) + ')';

			}

			if(intHueRotate !== 0)
			{

				strFilter+= ' hue-rotate(' + intHueRotate + 'deg)'

			}

			if(blnDropShadow === "1")
			{

				strFilter+= ' drop-shadow(' + strDropShadow + ')';

			}

			if(strFilter !== "")
			{

				$("#CSSGeneratorFilters").css("-webkit-filter", strFilter);
				$("#CSSGeneratorOutput").html('-ms-filter:' + strFilter + ';<br/>-webkit-filter:' + strFilter + ';<br/>-moz-filter:' + strFilter + ';<br/>-o-filter:' + strFilter + ';<br/>filter:' + strFilter + ';');

			} else {

				$("#CSSGeneratorFilters").css("-webkit-filter", "");
				$("#CSSGeneratorOutput").html('/* No filters applied */');

			}

		},

		/**
		 * Get the angle for a CSS filter value from the given offsets
		 */
		GetAngle : function(dx, dy)
		{

			var angle;

			if(dx > 0 && dy < 0)
			{

				angle = Math.round(Math.atan(-dx / dy) * 180 / Math.PI);

				return angle;

			} else if (dx > 0 && dy > 0)
			{

				angle = Math.round(180 + Math.atan(-dx / dy) * 180 / Math.PI);
				return angle;

			} else if (dx < 0 && dy < 0)
			{

				angle = Math.round(360 - Math.atan(dx / dy) * 180 / Math.PI);
				return angle;

			} else if (dx < 0 && dy > 0)
			{

				angle = Math.round(180 - Math.atan(dx / dy) * 180 / Math.PI);
				return angle;

			} else if (dx === 0 && dy > 0)
			{

				return 180;

			} else {

				return 0;

			}

		},

		RgbToHex : function(R,G,B)
		{

			return "#" + CSSGenerator.ToHex(R) + CSSGenerator.ToHex(G) + CSSGenerator.ToHex(B);

		},

		ToHex : function(n)
		{

			n = parseInt(n,10);

			if (isNaN(n))
			{

				return "00";

			}

			n = Math.max(0,Math.min(n,255));

			return "0123456789ABCDEF".charAt((n-n%16)/16) + "0123456789ABCDEF".charAt(n%16);

		},

		/**
		 * Convert a hexadecimal value to rgba
		 */
		HexToRgba : function (hex)
		{

			// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
			var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
			hex = hex.replace(shorthandRegex, function(m, r, g, b) {
				return r + r + g + g + b + b;
			});

			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			return result ? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16)
			} : null;

		},

		/**
		 * Check for 0, add px if not 0
		 * @param {integer} intVal The pixels to check
		 */
		FormatPixels : function(intVal)
		{

			intVal = parseFloat(intVal);

			return intVal === 0 ? "0" : intVal + "px";

		},

		/**
		 * CHeck for 0, add percentage if not 0
		 * @param {integer} intVal The percentage value to check
		 */
		FormatPercentage : function(intVal)
		{

			intVal = parseFloat(intVal);

			return intVal === 0 ? "0" : intVal + "%";

		},

		FormatDegrees : function(intVal)
		{

			intVal = parseFloat(intVal);

			return intVal === 0 ? "0" : intVal + "\xB0";

		}

	};

}();

$(function()
{

	CSSGenerator.Init();

});