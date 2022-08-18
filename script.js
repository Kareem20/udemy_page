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
  course.setAttribute("class", "card");

  let courseImage = document.createElement("img");
  courseImage.src = curCourse.image;
  course.appendChild(courseImage);

  let title = document.createElement("h1");
  title.textContent = curCourse.title;
  course.appendChild(title);

  let p1 = document.createElement("p");
  p1.textContent = curCourse.author;
  course.appendChild(p1);

  let sp1 = document.createElement("span");
  sp1.setAttribute("class", "fa fa-star checked");
  course.appendChild(sp1);

  let sp2 = document.createElement("span");
  sp2.setAttribute("class", "fa fa-star checked");
  course.appendChild(sp2);

  let sp3 = document.createElement("span");
  sp3.setAttribute("class", "fa fa-star checked");
  course.appendChild(sp3);

  let sp4 = document.createElement("span");
  sp4.setAttribute("class", "fa fa-star");
  course.appendChild(sp4);

  let sp5 = document.createElement("span");
  sp5.setAttribute("class", "fa fa fa-star");
  course.appendChild(sp5);

  let p2 = document.createElement("p");
  p2.textContent = curCourse.price;
  course.appendChild(p2);

  parent.appendChild(course);
}

function search() {
  let data = document.getElementById("search-bar-id").value;
  getCourse("cards", data);
}

function getCourse(child, subString) {
  let cards = document.getElementById(child);
  while (cards.firstChild) {
    cards.removeChild(cards.firstChild);
  }
  //fetch("https://raw.githubusercontent.com/Kareem20/udemy_page/frontend_Phase_2/data.json")
  fetch("http://localhost:3000/courses")
    .then((response) => response.json())
    .then((data) => {
      for (const it in data) {
        // console.log(data[it].title);
        renderCourse(data[it], cards, subString);
      }
    });
}


//fetch data when page is loaded.
getCourse("cards", "");