let userFormEl = document.querySelector(`#user-form`);
let nameInputEl = document.querySelector(`#username`);
let repoContainerEl = document.querySelector(`#repos-container`);
let repoSearchTerm = document.querySelector(`#repo-search-term`);

let formSubmitHandler = function (event) {
  event.preventDefault();

  let username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);
    nameInputEl.value = ``;
  } else {
    alert(`Please enter a GitHub username`);
  }
};

let getUserRepos = function (user) {
  let apiUrl = `https://api.github.com/users/${user}/repos`;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayRepos(data, user);
        });
      } else {
        alert('Error: GitHub User Not Found');
      }
    })
    .catch(function (error) {
      alert('Unable to connect to GitHub');
    });
};

let displayRepos = function (repos, searchTerm) {
  repoContainerEl.textContent = ``;
  repoSearchTerm.textContent = searchTerm;

  if (repos.length === 0) {
    repoContainerEl.textContent = `No repositories found.`;
    return;
  }

  for (let i = 0; i < repos.length; i++) {
    let repoName = `${repos[i].owner.login}/${repos[i].name}`;

    let repoEl = document.createElement(`a`);
    repoEl.setAttribute(`href`, `./single-repo.html?repo=${repoName}`);
    repoEl.classList = `list-item flex-row justify-space-betweeen align-center`;

    let titleEl = document.createElement(`span`);
    titleEl.textContent = repoName;

    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    repoEl.appendChild(titleEl);
    repoEl.appendChild(statusEl);

    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML = `<i class='fas fa-times status-icon icon-danger'></i> ${repos[i].open_issues_count} issue(s)`;
    } else {
      statusEl.innerHTML = `<i class='fas fa-check-square status-icon icon-success'></i>`;
    }

    repoContainerEl.appendChild(repoEl);
  }
};

userFormEl.addEventListener(`submit`, formSubmitHandler);
