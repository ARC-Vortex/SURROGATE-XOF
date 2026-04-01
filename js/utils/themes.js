// ************ Themes
var themes = ["Aero"]

var colors = {
	default: {
		1: "#ffffff",//Branch color 1
		2: "#bfbfbf",//Branch color 2
		3: "#7f7f7f",//Branch color 3
		color: "#dfdfdf",
		points: "#ffffff",
		locked: "#bf8f8f",
		background: "#0f0f0f",
		background_tooltip: "rgba(0, 0, 0, 0.75)",
	},
	Aero: {
	  1: "#FFFFFF",
	  2: "#8fa7bf",
	  3: "#5f6f7f",
	  color: "#FFFFFF",
	  points: "#FFFFFF",
	  locked: "#c4a7b3",
	  wid: "250px",
	  hei: "75px",
	  mrg: "2.5px",
	  clr: "linear-gradient(0deg, rgba(213,213,213,1) 0%, rgba(255,255,255,1) 100%)",
	  background: "#111111",
	  background_tooltip: "rgba(0, 15, 31, 0.75)",
	},
}
function changeTheme() {

	colors_theme = colors[options.theme || "Aero"];
	document.body.style.setProperty('--background', colors_theme["background"]);
	document.body.style.setProperty('--background_tooltip', colors_theme["background_tooltip"]);
	document.body.style.setProperty('--color', colors_theme["color"]);
	document.body.style.setProperty('--wid', colors_theme["wid"]);
	document.body.style.setProperty('--hei', colors_theme["hei"]);
	document.body.style.setProperty('--clr', colors_theme["clr"]);
	document.body.style.setProperty('--mrg', colors_theme["mrg"]);
	document.body.style.setProperty('--points', colors_theme["points"]);
	document.body.style.setProperty("--locked", colors_theme["locked"]);
}
function getThemeName() {
	return options.theme? options.theme : "Aero";
}

function switchTheme() {
	let index = themes.indexOf(options.theme)
	if (options.theme === null || index >= themes.length-1 || index < 0) {
		options.theme = themes[0];
	}
	else {
		index ++;
		options.theme = themes[index];
		options.theme = themes[1];
	}
	changeTheme();
	resizeCanvas();
}
