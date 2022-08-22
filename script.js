let curentCourse = 0;

function contain(title, search) {
  let titleLw = title.toLowerCase();
  let searchLw = search.toLowerCase();
  return titleLw.includes(searchLw);
}

function search() {
  let data = document.getElementById("search-bar-id").value;
  getCourse("cards", data, curentCourse);
}

function renderCourse(curCourse, subString) {
  subString = subString.trim();
  if (subString.length != 0 && contain(curCourse.title, subString) == false) {
    return;
  }

  let course = document.createElement("div");
  course.classList.add("col-lg-3");
  course.classList.add("col-md-4");
  course.classList.add("col-sm-12");
  course.classList.add("w-auto");
  course.innerHTML = `<div class="cardElement">
                          <img class="card-img" src="${curCourse.image}" />
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
  return course;
}
function createRow(listOfCourses) {
  let listOfRow = ``;
  let ind = 0;
  console.log(listOfCourses.length);
  for (let i = 0; i < Math.ceil(listOfCourses.length / 5); i++) {
    listOfRow += `<div class="carousel-item ${i == 0 ? "active" : ""}">
                    <div class="row">\n`;
    for (let k = 0; k < 5 && ind < listOfCourses.length; k++) {
      listOfRow += `${listOfCourses[ind++].outerHTML}`;
    }
    listOfRow += `</div>
                    </div>`;
  }
  const sliderControl = `<div class="row">
                          <div class="col-12">
                            <button class="carousel-control-prev" 
                              type="button" data-bs-target="#carouselHeader" 
                              data-bs-slide="prev">
                              <span class="carousel-control-prev-icon" 
                              aria-hidden="true"></span><span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" 
                              type="button" data-bs-target="#carouselHeader"
                              data-bs-slide="next">
                              <span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span>
                            </button>
                           </div>
                        </div>`;

  let container = document.createElement("div");
  container.classList.add("containerCourse");
  container.innerHTML = ` <div class="row mx-auto my-auto">
                              <div class="container_ carousel slide" id="carouselHeader" data-ride="carousel" data-interval="false">
                                <div class="carousel-inner" role="listbox">
                                  ${listOfRow}
                                </div>
                              </div>
                            </div>
                            ${sliderControl}
                          </div>`;
  console.log(listOfRow);

  let tem = document.getElementById("cards");
  let curContainer = document.getElementsByClassName("containerCourse")[0];
  if (curContainer != null) {
    curContainer.remove();
  }
  tem.appendChild(container);
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
  while (cards != null && cards.firstChild !== null) {
    cards.removeChild(cards.firstChild);
  }
  fetch("https://raw.githubusercontent.com/Kareem20/udemy_page/frontend-Phase_3/data.json")
    .then((response) => response.json())
    .then((data) => {
      curentCourse = coursesSelector;
      let courses = data[coursesSelector][arr[coursesSelector]];

      let listOfCourses = [];
      courses.forEach((element) => {
        listOfCourses.push(renderCourse(element, subString));
      });
      console.log(listOfCourses);
      createRow(listOfCourses);
    });
}

//fetch data when page is loaded.
getCourse("cards", "", 0);
