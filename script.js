function contain(title, search) {
  let titleLw = title.toLowerCase();
  let searchLw = search.toLowerCase();
  return titleLw.includes(searchLw);
}

function renderCourse(curCourse, parent, subString) {
  subString = subString.trim();
  if (subString.length != 0 && contain(curCourse.title, subString) == false) {
    return;
  }
  let course = document.createElement("div");
  course.innerHTML = ` <div class="card">
                          <img src="${curCourse.image}" />
                          <div class="insideCard">
                            <h1>${curCourse.title}</h1>
                            <p1>${curCourse.author}</p1>
                            <div class="stars">
                              <span class="fa fa-star checked"></span>
                              <span class="fa fa-star checked"></span>
                              <span class="fa fa-star"></span>
                              <span class="fa fa-star"></span>   
                            </div>
                            <p2>${curCourse.price}</p2>
                          </div>
                        </div>`;
  if (parent !== null) parent.appendChild(course);
}

function search() {
  //TODO:search on specific tab.
  let data = document.getElementById("search-bar-id").value;
  getCourse("cards", data);
}

function getCourse(child, subString, coursesSelector) {
  const arr = [
    "Python",
    "Excel",
    "WebDevelopment",
    "JavaScript",
    "DataScience",
    "AWSCertification",
    "Drawing",
  ];
  let cards = document.getElementById(child);
  while (cards !== null && cards.firstChild !== null) {
    cards.removeChild(cards.firstChild);
  }
  //fetch("https://raw.githubusercontent.com/Kareem20/udemy_page/frontend_Phase_2/data.json")
  fetch("http://localhost:3000/tab")
    .then((response) => response.json())
    .then((data) => {
      let courses = data[coursesSelector][arr[coursesSelector]];
      //console.log(courses);
      courses.forEach((element) => {
        renderCourse(element, cards, subString);
      });
    });
}

//fetch data when page is loaded.
getCourse("cards", "", 0);
