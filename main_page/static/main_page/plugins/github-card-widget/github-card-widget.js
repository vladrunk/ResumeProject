function appendToWidget(parentSelector, tag, classes, html) {
    /**
     * Добавляет новый елемент в уже существующий, присваевает новому класс и наполняет этот елемент
     */
	let parentNode = document.querySelector(parentSelector);
	let childNode = document.createElement(tag);
	childNode.innerHTML = html;
	childNode.className += classes;
	parentNode.appendChild(childNode);
}

function getJSON(url, callback) {
    /**
     * Отправляет запрос на reqUrl, преобразовывает ответ в JSON и передает respJSON в func
     */
	let request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.onload = function() {
		if (request.status === 200) {
			let data = JSON.parse(request.responseText);
			callback(data);
		}
	};
	request.send();
}

function ready(fn) {
	if (document.readyState !== 'loading') {
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

function start() {
	let widgets = document.querySelectorAll('.github-widget');
	for (let i = 0; i < widgets.length; i++) {
		let parentNode = widgets[i];
		parentNode.setAttribute("id", "widget" + i);
		appendToWidget(
		    "#widget" + i,
            "div",
            "",
			'<div class="gh-widget-repositories"></div><div class="gh-widget-container"><div class="gh-widget-item gh-widget-active-time"></div></div>'
        )
		let username = parentNode.dataset.username;
		fetchRepos(username, "#widget" + i);
	}
}

ready(start);

function fetchRepos(username, widgetId) {
    /**
     * Находит репозитории юзера
     */
	let url = "https://api.github.com/users/" + username + "/repos?per_page=1000";
	getJSON(url, function(response) {
		updateRepoDetails(topRepos(response), widgetId);
		updateLastPush(lastPushedDay(response), widgetId);
	});
}

function updateLastPush(lastDay, widgetId) {
	appendToWidget(
	    widgetId + " .gh-widget-active-time",
        "span",
        "",
        'Last active: ' + (lastDay ? lastDay + ' day(s) ago' : 'Today')
    );
}

function lastPushedDay(repos) {
    let now = new Date();
    let latestDate;
	let difference = 9999999999999;
	for (let i = 0; i < repos.length; i++) {
		let pushedDate = new Date(repos[i]["pushed_at"])
		if (now - pushedDate < difference) {
			latestDate = pushedDate;
			difference = now - pushedDate;
		}
	}
	return Math.floor((now - latestDate) / (1000 * 3600 * 24));
}

function updateRepoDetails(repos, widgetId) {
	for (let i = 0; i < repos.length; i++) {
		let language = repos[i].language ? repos[i].language : "Unknown";
		appendToWidget(
		    widgetId + " .gh-widget-repositories",
            "div",
            "gh-widget-container",
            '<div class="gh-widget-item names"><div><a class="gh-widget-link" href="' + repos[i].repoUrl +
			'">' + repos[i].name + '</a></div></div><div class="gh-widget-item language"><div>' +
			language + '</div></div>'
        );
	}
}

function topRepos(repos) {
	repos.sort(function(a, b) {
		if (a["stargazers_count"] === b["stargazers_count"]) {
			return 0;
		} else if (a["stargazers_count"] > b["stargazers_count"]) {
			return -1;
		} else {
			return 1;
		}
	})
	repos = repos.slice(0, 3);
	let result = [];
	for (let i in repos) {
		result.push({
			name: repos[i].name,
			stars: repos[i]["stargazers_count"],
			language: repos[i].language,
			repoUrl: repos[i]["html_url"]

		});
	}
	return result;
}