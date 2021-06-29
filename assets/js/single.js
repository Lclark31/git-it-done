let issuesContainerEl = document.querySelector(`#issues-container`);

let getRepoIssues = function (repo) {
  var apiUrl = `https://api.github.com/repos/${repo}/issues?direction=asc`;

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayIssues(data);
      });
    } else {
      alert(`There was a problem with your request!`);
    }
  });
};

let displayIssues = function (issues) {
  if (issues.length === 0) {
    issuesContainerEl.textContent = `This repo has no open issues!`;
  }
  for (let i = 0; i < issues.length; i++) {
    let issuesEl = document.createElement(`a`);

    issuesEl.classList = `list-item flex-row justify-space-between align-center`;
    issuesEl.setAttribute(`href`, issues[i].html_url);
    issuesEl.setAttribute(`target`, `_blank`);

    let titleEl = document.createElement(`span`);
    titleEl.textContent = issues[i].title;

    issuesEl.appendChild(titleEl);

    let typeEl = document.createElement(`span`);

    if (issues[i].pull_request) {
      typeEl.textContent = `(Pull Request)`;
    } else {
      typeEl.textContent = `(Issue)`;
    }

    issuesEl.appendChild(typeEl);
    issuesContainerEl.appendChild(issuesEl);
  }
};

getRepoIssues(`lclark31/run-buddy`);
