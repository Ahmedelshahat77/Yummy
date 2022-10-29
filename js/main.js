// jquery
//sidebar menu
$('.baricon i').click(function () {
  let navbarWidth = $('.navbar-menu').outerWidth();
  if ($('.navbar-menu').css('left') == '0px') {
    $('.navbar-menu').animate({ left: -navbarWidth }, 500);
    $('.navbar').animate({ left: 0 }, 500);
    $('.baricon i').removeClass('fa-xmark');
    $('.baricon i').addClass('fa-bars');
    $('.navbar-menu ul li').animate({ paddingTop: '700px', opacity: '0' }, 500);
  } else {
    $('.navbar-menu').animate({ left: 0 }, 500);
    $('.navbar-menu ul li:nth-child(1)').animate(
      { paddingTop: '25px', opacity: '1' },
      1000
    );
    $('.navbar-menu ul li:nth-child(2)').animate(
      { paddingTop: '25px', opacity: '1' },
      1100
    );
    $('.navbar-menu ul li:nth-child(3)').animate(
      { paddingTop: '25px', opacity: '1' },
      1200
    );
    $('.navbar-menu ul li:nth-child(4)').animate(
      { paddingTop: '25px', opacity: '1' },
      1300
    );
    $('.navbar-menu ul li:nth-child(5)').animate(
      { paddingTop: '25px', opacity: '1' },
      1400
    );
    $('.navbar').animate({ left: navbarWidth }, 500);
    $('.baricon i').addClass('fa-xmark');
    $('.baricon i').removeClass('fa-bars');
  }
});
$('.searchBtn').click(function () {
  let navbarWidth = $('.navbar-menu').outerWidth();
  $('.showSearch').css('display', 'flex');
  // $('#showMealsByName').css('display', 'flex');
  //$('#homeMeals').css('display', 'none');
  // $('#categories').css('display', 'none');
  $('#homeMeals').empty();
  $('#categories').empty();
  $('#mealDetails').empty();
  $('#form').empty();
  $('.navbar-menu').animate({ left: -navbarWidth }, 500);
  $('.navbar').animate({ left: 0 }, 500);
  $('.baricon i').removeClass('fa-xmark');
  $('.baricon i').addClass('fa-bars');
});
$('.logoHome').click(function () {
  let navbarWidth = $('.navbar-menu').outerWidth();
  $('.showSearch').css('display', 'none');
  // $('#homeMeals').css('display', 'flex');
  // $('#showMealsByName').css('display', 'none');
  // $('#categories').css('display', 'none');
  $('#showMealsByName').empty();
  $('#categories').empty();
  $('#mealDetails').empty();
  $('#form').empty();
  $('.navbar-menu').animate({ left: -navbarWidth }, 500);
  $('.navbar').animate({ left: 0 }, 500);
  $('.baricon i').removeClass('fa-xmark');
  $('.baricon i').addClass('fa-bars');
  getMeals();
});
$('.categoryBtn').click(function () {
  let navbarWidth = $('.navbar-menu').outerWidth();
  $('.navbar-menu').animate({ left: -navbarWidth }, 500);
  $('.navbar').animate({ left: 0 }, 500);
  $('.baricon i').removeClass('fa-xmark');
  $('.baricon i').addClass('fa-bars');
  $('.showSearch').css('display', 'none');
  //$('#homeMeals').css('display', 'none');
  // $('#showMealsByName').css('display', 'none');
  $('#homeMeals').empty();
  $('#showMealsByName').empty();
  $('#mealDetails').empty();
  $('#form').empty();
  $('#areaMeals').empty();
  $('#area').empty();
  // $('#categories').css('display', 'flex');
  getCategories();
});
$('.areaBtn').click(function () {
  let navbarWidth = $('.navbar-menu').outerWidth();
  $('.navbar-menu').animate({ left: -navbarWidth }, 500);
  $('.navbar').animate({ left: 0 }, 500);
  $('.baricon i').removeClass('fa-xmark');
  $('.baricon i').addClass('fa-bars');
  $('.showSearch').css('display', 'none');
  $('#categories').empty();
  $('#homeMeals').empty();
  $('#form').empty();
  $('#showMealsByName').empty();
  $('#mealDetails').empty();
  getArea();
});
$('.ingrBtn').click(function () {
  let navbarWidth = $('.navbar-menu').outerWidth();
  $('.navbar-menu').animate({ left: -navbarWidth }, 500);
  $('.navbar').animate({ left: 0 }, 500);
  $('.baricon i').removeClass('fa-xmark');
  $('.baricon i').addClass('fa-bars');
  $('.showSearch').css('display', 'none');
  $('#categories').empty();
  $('#homeMeals').empty();
  $('#showMealsByName').empty();
  $('#mealDetails').empty();
  $('#form').empty();
  $('#area').empty();
  $('#areaMeals').empty();
  $('#ingredientMeals').empty();
  getIngredients();
});

$('.formBtn').click(function () {
  let navbarWidth = $('.navbar-menu').outerWidth();
  $('.navbar-menu').animate({ left: -navbarWidth }, 500);
  $('.navbar').animate({ left: 0 }, 500);
  $('.baricon i').removeClass('fa-xmark');
  $('.baricon i').addClass('fa-bars');
  $('.showSearch').css('display', 'none');
  $('#categories').empty();
  $('#homeMeals').empty();
  $('#showMealsByName').empty();
  $('#mealDetails').empty();
  $('#ingredientMeals').empty();
  $('#ingredients').empty();
  $('#area').empty();
  $('#areaMeals').empty();
  form();
});

//end jquery

//end sidebarmenu

let responseMealsApi,
  responseData,
  arr = [],
  homeMeals = document.getElementById('homeMeals'),
  mealDetails = document.getElementById('mealDetails'),
  meal,
  mealName = document.getElementById('searchInput'),
  MealByName = document.getElementById('showMealsByName'),
  allCategories = document.getElementById('categories'),
  categoriesMeal = document.getElementById('categoriesMeal'),
  areaMeals = document.getElementById('areaMeals'),
  area = document.getElementById('area'),
  ingredients = document.getElementById('ingredients'),
  ingredientMeals = document.getElementById('ingredientMeals'),
  mealByFirstLetter = document.getElementById('letter');

//start home api fetch

async function getMeals() {
  responseMealsApi = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  );
  responseData = await responseMealsApi.json();
  //console.log(responseData);
  showMeals();
  getMealDetails();
}
getMeals();

function showMeals() {
  let meals = '';
  for (let i = 0; i < 20; i++) {
    meals += ` <div class="col-md-3">
          <div class="meal-img">
            <img class="w-100 rounded" src="${responseData.meals[i].strMealThumb}" alt="" />
            <div onclick="getMealDetails(${responseData.meals[i].idMeal})" class="overlay-meal  rounded">
              <div class="p-2">
                <h2>${responseData.meals[i].strMeal}</h2>
              </div>
            </div>
          </div>
        </div>`;
  }
  homeMeals.innerHTML = meals;
}

/* get meal details api */
async function getMealDetails(mealID) {
  responseMealsApi = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );
  let responseMealData = await responseMealsApi.json();
  meal = responseMealData.meals[0];
  console.log(responseMealData);
  mealShowData();
  $('#homeMeals').empty();
  $('#showMealsByName').empty();
  $('#categories').empty();
  $('#categoriesMeal').empty();
  $('#ingredients').empty();
  $('#ingredientMeals').empty();
  $('#areaMeals').empty();
  $('#area').empty();
  $('#form').empty();
  $('.showSearch').css('display', 'none');
}

function mealShowData() {
  let mealInfo = '';
  mealInfo += ` <div class="col-md-4">
          <div class="mealImg">

            <img class="w-100" src="${meal.strMealThumb}" alt="" />
          </div>
          <h1>${meal.strMeal}</h1>
        </div>
        <div class="col-md-8">
          <div class="meal-info">
            <h3>Instructions</h3>
            <p>${meal.strInstructions}</p>
            <h4>Area : <span>${meal.strArea}</span></h4>
            <h4>Category :${meal.strCategory} <span></span></h4>
            <h4>Recipes :</h4>
            <ul class="d-flex list-unstyled" id="recipes"> 
            </ul>
            <h4>Tags:</h4>
            <ul class="d-flex list-unstyled" id="tags">    
            </ul>
            <a class="btn btn-success text-white" target="_blank" href="${meal.strSource}"
              >Source</a
            >
            <a class="btn youtube text-white" target="_blank" href="${meal.strYoutube}">Youtub</a>
          </div>
        </div>`;

  let recipes = '';
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      recipes += `<li class="my-3 mx-1 p-1 alert-success rounded">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(',');
  let tagsStr = '';
  for (let i = 0; i < tags?.length; i++) {
    tagsStr += `<li class="my-3 mx-1 p-1 alert-danger rounded">${tags[i]}</li>`;
  }

  mealDetails.innerHTML = mealInfo;
  document.getElementById('recipes').innerHTML = recipes;
  document.getElementById('tags').innerHTML = tagsStr;
}

/*end meal details */

//search section
//by name
async function getMealsByName(mealNameValue) {
  responseMealsApi = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealNameValue}`
  );
  responseMealsByNamerData = await responseMealsApi.json();
  responseMealsByNameData = responseMealsByNamerData.meals;
  showMealByName();
}

function showMealByName() {
  let meals = '';
  for (let i = 0; i < responseMealsByNameData.length; i++) {
    meals += ` <div class="col-md-3">
          <div class="meal-img">
            <img class="w-100 rounded" src="${responseMealsByNameData[i].strMealThumb}" alt="" />
            <div onclick="getMealDetails(${responseMealsByNameData[i].idMeal})" class="overlay-meal  rounded">
              <div class="p-2">
                <h2>${responseMealsByNameData[i].strMeal}</h2>
              </div>
            </div>
          </div>
        </div>`;
  }
  MealByName.innerHTML = meals;
}

//by letter
async function getMealsByletter(mealNameLetterValue) {
  responseMealsApi = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${mealNameLetterValue}`
  );
  responseMealsByLetterData = await responseMealsApi.json();
  responseMealsByLetterData = responseMealsByLetterData.meals;
  showLetterSearch();
}
function showLetterSearch() {
  let meals = '';
  for (let i = 0; i < responseMealsByLetterData.length; i++) {
    meals += ` <div class="col-md-3">
          <div class="meal-img">
            <img class="w-100 rounded" src="${responseMealsByLetterData[i].strMealThumb}" alt="" />
            <div onclick="getMealDetails(${responseMealsByLetterData[i].idMeal})" class="overlay-meal  rounded">
              <div class="p-2">
                <h2>${responseMealsByLetterData[i].strMeal}</h2>
              </div>
            </div>
          </div>
        </div>`;
  }
  MealByName.innerHTML = meals;
}

mealName.addEventListener('keyup', function () {
  mealNameValue = mealName.value;
  console.log(mealNameValue);
  getMealsByName(mealNameValue);
});

mealByFirstLetter.addEventListener('keyup', function () {
  mealNameLetterValue = mealByFirstLetter.value;
  //console.log(mealNameLetterValue);
  getMealsByletter(mealNameLetterValue);
});
/*end search */

/* category */

async function getCategories() {
  responseCategoriesApi = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  responseCategoriesData = await responseCategoriesApi.json();
  responseCategoriesData = responseCategoriesData.categories;
  showCategories();
}
//https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
function showCategories() {
  let categories = '';
  for (let i = 0; i < responseCategoriesData.length; i++) {
    categories += ` <div class="col-md-3">
          <div class="category-img">
            <img class="w-100 rounded" src="${responseCategoriesData[i].strCategoryThumb}" alt="" />
            <div onclick="showMealsByCategory('${responseCategoriesData[i].strCategory}')" class="overlay-category rounded">
              <div class="p-2">
                <h2>${responseCategoriesData[i].strCategory}</h2>
                <p>${responseCategoriesData[i].strCategoryDescription}</p>
              </div>
            </div>
          </div>
        </div>`;
  }
  allCategories.innerHTML = categories;
}

async function showMealsByCategory(categoryName) {
  let responsMealsByCategoryApi = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
  );
  responseMealsByCategoryData = await responsMealsByCategoryApi.json();
  responseMealsByCategoryData = responseMealsByCategoryData.meals;
  showCategoryMeals();
  $('#homeMeals').empty();
  $('#showMealsByName').empty();
  $('#categories').empty();
  $('#ingredients').empty();
  $('#ingredientMeals').empty();
  $('#form').empty();
  $('.showSearch').css('display', 'none');
}

function showCategoryMeals() {
  let meals = '';
  for (let i = 0; i < responseMealsByCategoryData.length; i++) {
    meals += ` <div class="col-md-3">
          <div class="meal-img">
            <img class="w-100 rounded" src="${responseMealsByCategoryData[i].strMealThumb}" alt="" />
            <div onclick="getMealDetails(${responseMealsByCategoryData[i].idMeal})" class="overlay-meal  rounded">
              <div class="p-2">
                <h2>${responseMealsByCategoryData[i].strMeal}</h2>
              </div>
            </div>
          </div>
        </div>`;
  }
  categoriesMeal.innerHTML = meals;
}

/*end category*/

/*start area */

async function getArea() {
  responseAreaApi = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  responseAreaData = await responseAreaApi.json();
  responseAreaData = responseAreaData.meals;
  //console.log(responseAreaData);
  showArea();
}

function showArea() {
  let areas = '';
  for (let i = 0; i < responseAreaData.length; i++) {
    areas += `  <div class="col-md-3 my-3">
          <div onclick="showMealsByArea('${responseAreaData[i].strArea}')" class="meal-area">
            <i class="fa-solid fa-city fa-3x text-danger"></i>
            <h2>${responseAreaData[i].strArea}</h2>
          </div>
        </div>`;
  }
  area.innerHTML = areas;
}

async function showMealsByArea(areaName) {
  let responsMealsByAreaApi = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`
  );
  responseMealsByAreaData = await responsMealsByAreaApi.json();
  responseMealsByAreaData = responseMealsByAreaData.meals;
  showAreaMeals();
  $('#homeMeals').empty();
  $('#showMealsByName').empty();
  $('#categories').empty();
  $('#area').empty();
  $('#ingredients').empty();
  $('#ingredientMeals').empty();
  $('#form').empty();
  $('.showSearch').css('display', 'none');
}

function showAreaMeals() {
  let meals = '';
  for (let i = 0; i < responseMealsByAreaData.length; i++) {
    meals += ` <div class="col-md-3">
          <div class="meal-img">
            <img class="w-100 rounded" src="${responseMealsByAreaData[i].strMealThumb}" alt="" />
            <div onclick="getMealDetails(${responseMealsByAreaData[i].idMeal})" class="overlay-meal  rounded">
              <div class="p-2">
                <h2>${responseMealsByAreaData[i].strMeal}</h2>
              </div>
            </div>
          </div>
        </div>`;
  }
  areaMeals.innerHTML = meals;
}

/* end area */

/* start Ingredients  */

async function getIngredients() {
  responseIngredientsApi = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  responseIngredientsData = await responseIngredientsApi.json();
  responseIngredientsData = responseIngredientsData.meals;
  //console.log(responseAreaData);
  showIngredients();
}

function showIngredients() {
  let ingredient = '';
  for (let i = 0; i < 20; i++) {
    ingredient += `  <div class="col-md-3 my-3">
          <div onclick="showMealsByIngredient('${responseIngredientsData[i].strIngredient}')" class="meal-area">
            <i class="fa-solid fa-bowl-food fa-3x text-success"></i>
            <h2  class=" text-white">${responseIngredientsData[i].strIngredient}</h2>
          </div>
        </div>`;
  }
  ingredients.innerHTML = ingredient;
}

async function showMealsByIngredient(ingredientName) {
  let responsMealsByIngredientApi = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`
  );
  responseMealsByIngredientData = await responsMealsByIngredientApi.json();
  responseMealsByIngredientData = responseMealsByIngredientData.meals;
  showIngredientMeals();
  $('#homeMeals').empty();
  $('#showMealsByName').empty();
  $('#categories').empty();
  $('#area').empty();
  $('#ingredients').empty();
  $('#form').empty();
  $('.showSearch').css('display', 'none');
}

function showIngredientMeals() {
  let meals = '';
  for (let i = 0; i < responseMealsByIngredientData.length; i++) {
    meals += ` <div class="col-md-3">
          <div class="meal-img">
            <img class="w-100 rounded" src="${responseMealsByIngredientData[i].strMealThumb}" alt="" />
            <div onclick="getMealDetails(${responseMealsByIngredientData[i].idMeal})" class="overlay-meal  rounded">
              <div class="p-2">
                <h2>${responseMealsByIngredientData[i].strMeal}</h2>
              </div>
            </div>
          </div>
        </div>`;
  }
  ingredientMeals.innerHTML = meals;
}
/* end Ingredients */

/* start form */
let formData = document.getElementById('form');
function form() {
  formData.innerHTML = `     
		<div class="p-2">
			<h2 class="text-light mb-5">ContacUs...</h2>
			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<input class="form-control shadow " onkeyup="validation()" id="name"
							placeholder="Enter Your Name">
						<div class="alert mt-1 alert-danger d-none" id="namealert" role="alert">
							Special Characters and Numbers not allowed
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" id="email" placeholder="Enter Email">
						<div class="alert mt-1 alert-danger d-none" id="emailalert" role="alert">
							Enter valid email. *Ex: xxx@yyy.zzz
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" id="phone" placeholder="Enter phone">
						<div class="alert mt-1 alert-danger  d-none" id="phonealert" role="alert">
							Enter valid Phone Number
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" id="age" placeholder="Enter Age">
						<div class="alert mt-1 alert-danger  d-none" id="agealert" role="alert">
							Enter valid Age
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" type="password" id="password"
							placeholder="Enter Password">
						<div class="alert mt-1 alert-danger  d-none" id="passwordalert" role="alert">
							Enter valid password *Minimum eight characters, at least one letter and one number:*
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" type="password" id="rePassword"
							placeholder="Enter RePassword">
						<div class="alert mt-1 alert-danger  d-none" id="repasswordalert" role="alert">
							Enter valid Repassword
						</div>
					</div>
				</div>


			</div>

			<button type="submit" disabled id="submitBtn" class="my-3 btn btn-outline-danger">Submit</button>
		</div>
 `;
}

/* end form */

function validation() {
  if (
    usernameValidation() == true &&
    emailValidation() == true &&
    phoneValidation() == true &&
    ageValidation() == true &&
    passwordValidation() == true &&
    repasswordValidation() == true
  ) {
    document.getElementById('submitBtn').removeAttribute('disabled');
  } else {
    document.getElementById('submitBtn').setAttribute('disabled', 'true');
  }
}

function usernameValidation() {
  let userName = document.getElementById('name'),
    userNameAlert = document.getElementById('namealert');

  let regex = /^[A-Za-z]{3,10}(\s?[A-Za-z]{3,10})?$/;
  if (regex.test(userName.value) == true && userName.value != '') {
    userName.classList.remove('is-invalid');
    userName.classList.add('is-valid');
    userNameAlert.classList.replace('d-block', 'd-none');
    userNameAlert.classList.replace('d-block', 'd-none');

    return true;
  } else {
    userName.classList.replace('is-valid', 'is-invalid');
    userNameAlert.classList.replace('d-none', 'd-block');

    return false;
  }
}
function emailValidation() {
  let userEmail = document.getElementById('email'),
    userEmailAlert = document.getElementById('emailalert');

  let regex = /@[a-z]{5,10}(\.com)$/;
  if (regex.test(userEmail.value) == true && userEmail.value != '') {
    userEmail.classList.remove('is-invalid');
    userEmail.classList.add('is-valid');
    userEmailAlert.classList.replace('d-block', 'd-none');
    userEmailAlert.classList.replace('d-block', 'd-none');

    return true;
  } else {
    userEmail.classList.replace('is-valid', 'is-invalid');
    userEmailAlert.classList.replace('d-none', 'd-block');

    return false;
  }
}

function phoneValidation() {
  let userPhone = document.getElementById('phone'),
    userPhoneAlert = document.getElementById('phonealert');

  let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  if (regex.test(userPhone.value) == true && userPhone.value != '') {
    userPhone.classList.remove('is-invalid');
    userPhone.classList.add('is-valid');
    userPhoneAlert.classList.replace('d-block', 'd-none');
    userPhoneAlert.classList.replace('d-block', 'd-none');

    return true;
  } else {
    userPhone.classList.replace('is-valid', 'is-invalid');
    userPhoneAlert.classList.replace('d-none', 'd-block');

    return false;
  }
}
function ageValidation() {
  let userAge = document.getElementById('age'),
    userAgeAlert = document.getElementById('agealert');

  let regex = /^[1-9][0-9]?$|^100$/;
  if (regex.test(userAge.value) == true && userAge.value != '') {
    userAge.classList.remove('is-invalid');
    userAge.classList.add('is-valid');
    userAgeAlert.classList.replace('d-block', 'd-none');
    userAgeAlert.classList.replace('d-block', 'd-none');

    return true;
  } else {
    userAge.classList.replace('is-valid', 'is-invalid');
    userAgeAlert.classList.replace('d-none', 'd-block');

    return false;
  }
}

function passwordValidation() {
  (userPassword = document.getElementById('password')),
    (userpasswordAlert = document.getElementById('passwordalert'));

  let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (regex.test(userPassword.value) == true && userPassword.value != '') {
    userPassword.classList.remove('is-invalid');
    userPassword.classList.add('is-valid');
    userpasswordAlert.classList.replace('d-block', 'd-none');
    userpasswordAlert.classList.replace('d-block', 'd-none');

    return true;
  } else {
    userPassword.classList.replace('is-valid', 'is-invalid');
    userpasswordAlert.classList.replace('d-none', 'd-block');

    return false;
  }
}
function repasswordValidation() {
  let userRePassword = document.getElementById('rePassword'),
    userRepasswordAlert = document.getElementById('repasswordalert');

  if (
    userPassword.value == userRePassword.value &&
    userRePassword.value != ''
  ) {
    userRePassword.classList.remove('is-invalid');
    userRePassword.classList.add('is-valid');
    userRepasswordAlert.classList.replace('d-block', 'd-none');
    userRepasswordAlert.classList.replace('d-block', 'd-none');

    return true;
  } else {
    userRePassword.classList.replace('is-valid', 'is-invalid');
    userRepasswordAlert.classList.replace('d-none', 'd-block');

    return false;
  }
}
