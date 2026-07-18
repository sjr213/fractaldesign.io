// These are strings used to identify the different galleries across the pages
// For some reason constants defined in one file are not available in the others
// "Fractals"
// "Fractal3d"
// "Automata"
// "Attractors"

// counters
let slideIndex3D = 1;
let slideIndexFractals = 1;
let slideIndexAutomata = 1;
let slideIndexAttractors = 1;

// Fractal3D doesn't need a first time because it is the first slide and not delayed
let firstFractalTime = false;
let firstAutomataTime = false;
let firstAttractorsTime = false;

// First index slides start at 
// ranges from 0 to number of slides - 4
let firstIndex3D = 140;                // current max = 15 x 12 = 180 - 4 = 176
let firstIndexFractals = 152;          // current max = 38 x 12 = 456 - 4 = 452
let firstIndexAutomata = 140;          // current max = 35 x 12 = 420 - 4 = 404
let firstIndexAttractors = 140;        // current max = 30 x 12 = 360 - 4 = 356

let _groupsFractal3D;
let _groupsFractals;
let _groupsAutomata;
let _groupsAttractors;
let _message = "something to show";
function SetGroupsFractal3D(groups) {
  _groupsFractal3D = groups;
}
function SetGroupsFractals(groups) {
  _groupsFractals = groups;
}
function SetGroupsAutomata(groups) {
  _groupsAutomata = groups;
}
function SetGroupsAttractors(groups) {
  _groupsAttractors = groups;
}

function getGroupsFractals(){
  return _groupsFractals;
}

// remove me later after testing galleries
function getImage(){
  return "Images/Fractals/fr1_300/n10w3.jpg";
}

function loadFractal3D(xml){
    groups = LoadGroups(xml);
    SetGroupsFractal3D(groups); 
    setSlideShowImages(_groupsFractal3D, "fractal3D", firstIndex3D);  
    showSlidesFractal3D();
  }

  function loadFractals(xml){
    if(_groupsFractals == null){
      groups = LoadGroups(xml);
      SetGroupsFractals(groups);
    }
    setSlideShowImages(_groupsFractals, "fractals", firstIndexFractals);
    showSlidesFractals();
  }

  function loadAutomata(xml){
    groups = LoadGroups(xml);
    SetGroupsAutomata(groups);
    setSlideShowImages(_groupsAutomata, "automata", firstIndexAutomata);
    showSlidesAutomata();
  }

  function loadAttractors(xml){
    groups = LoadGroups(xml);
    SetGroupsAttractors(groups);
    setSlideShowImages(_groupsAttractors, "attractor", firstIndexAttractors);
    showSlidesAttractors();
  }

  // Called for single image display
  function loadGroupsForSingle(xml)
  {
    groups = LoadGroups(xml);
    loadSingleGroups(groups);
  }

  // Called from GalleryJuliaSets.html 
  function loadFractalsForGallery(xml){
    if(_groupsFractals != null){
      return _groupsFractals;
    }
    SetGroupsFractals(LoadGroups(xml));
    loadFractalGalleryImages(_groupsFractals)
  }
  
  // Called from GalleryAutomata.html 
  function loadAutomataForGallery(xml){
    if(_groupsAutomata != null){
      return _groupsAutomata;
    }
    SetGroupsAutomata(LoadGroups(xml));
    loadAutomataGalleryImages(_groupsAutomata)
  }

  // Called from GalleryAttractors.html 
  function loadAttractorsForGallery(xml){
    if(_groupsAttractors != null){
      return _groupsAttractors;
    }
    SetGroupsAttractors(LoadGroups(xml));
    loadAttractorGalleryImages(_groupsAttractors)
  }

  // Called from GalleryFractal3d.html 
  function loadFractal3dForGallery(xml){
    if(_groupsFractal3D != null){
      return _groupsFractal3D;
    }
    SetGroupsFractal3D(LoadGroups(xml));
    loadFractal3dGalleryImages(_groupsFractal3D)
  }

  function LoadGroups(xml) {
    xmlDoc = xml.responseXML;
    x = xmlDoc.getElementsByTagName("Group");
    groups = [];
    for (i = 0; i <x.length; i++) {
      group = {"GroupName": x[i].getElementsByTagName("GroupName")[0].childNodes[0].nodeValue,
               "FriendlyName": x[i].getElementsByTagName("FriendlyName")[0].childNodes[0].nodeValue,
               "Description": x[i].getElementsByTagName("Description")[0].childNodes[0].nodeValue,
               "Score": x[i].getElementsByTagName("Score")[0].childNodes[0].nodeValue,
               "Date": x[i].getElementsByTagName("CreationDate")[0].childNodes[0].nodeValue};
      images = x[i].getElementsByTagName("Image");
      group.images = [];
      for(j = 0; j < images.length; j++) {
        image = {"ImageName": images[j].getElementsByTagName("ImageName")[0].childNodes[0].nodeValue,
                 "ImagePath": images[j].getElementsByTagName("ImagePath")[0].childNodes[0].nodeValue,
                 "ImageWidth": images[j].getElementsByTagName("ImageWidth")[0].childNodes[0].nodeValue,
                 "ImageHeight": images[j].getElementsByTagName("ImageHeight")[0].childNodes[0].nodeValue,
                 "ImageSizeKb": images[j].getElementsByTagName("ImageSizeKb")[0].childNodes[0].nodeValue,
                 "ImageExtension": images[j].getElementsByTagName("ImageExtension")[0].childNodes[0].nodeValue};   
        group.images.push(image);
      }
      groups.push(group);
    }
    return groups;          
  }

  /*
  function showGroupsFractal3D() {
    document.getElementById("demo").innerHTML = _message;
    table="<tr><th>Group</th><th>Name</th><th>Descr</th><th>ImageName</th></tr>";
    var count = Math.min(_groupsFractal3D.length, 5);
    for (i = 0; i < count; i++) {
      g = _groupsFractal3D[i];
      table += "<tr><td>" +
      g.GroupName +
      "</td><td>" +
      g.FriendlyName +
      "</td><td>" +
      g.Description +
      "</td><td>" +
      g.images[0].ImageName +
      "</td></tr>";
    }
    document.getElementById("demo").innerHTML = table;
  } 
  */

  function setSlideShowImages(groups, slideName, startIndex){
    images = getBestImageDataList(groups, startIndex, 4, 300); 
    if(images.length > 0){
      image = images[0];
      document.getElementById(slideName + "_1").src = image.ImagePath;
    }
    if(images.length > 1){
      image = images[1];
      document.getElementById(slideName + "_2").src = image.ImagePath;
    }
    if(images.length > 2){
      image = images[2];
      document.getElementById(slideName + "_3").src = image.ImagePath;
    }
    if(images.length > 3){
        image = images[3];
        document.getElementById(slideName + "_4").src = image.ImagePath;
    }
  }

  function getBestImageDataList(groups, startIndex, numberOfImages, imageSize) {
    imageList = [];
    targetIndex = startIndex;
    imageCount = 0;
    for (i = 0; i < groups.length && imageCount < numberOfImages; i++) {
      if(targetIndex >= groups.length) {
        targetIndex = 0;
      }
      image = getBestImageData(groups, targetIndex, imageSize);
      if (image != null) {
        imageList.push(image);
        imageCount++;
      }
      targetIndex++;
    }

    return imageList;
  }

  // find the greater dimension width or height, subtract displayImageDimension
  // if it is less than the previous but greater than zero than keep it
  // if the previous difference is less than 0, and the new one is positive, then keep the new one
  function getBestImageData(groups, index, imageSize) {
    if(index >= groups.length) {
      return null;
    }
    group = groups[index];

    return getBestSizedImage(group, imageSize);
  }

  function getBestSizedImage(group, imageSize){
    bestImage = null;
    leastDiff = -10000;
    nImages = group.images.length;

    for (i = 0; i < nImages; i++) {
      image = group.images[i];
      maxDimension = Math.max(image.ImageWidth, image.ImageHeight);
      newDiff = maxDimension - imageSize;
      
      if (leastDiff < 0){
        leastDiff = Math.abs(newDiff);
        bestImage = image;
      } // allow slight smaller images to be used
      else if( newDiff >= -3 && Math.abs(newDiff) < leastDiff ){
        leastDiff = Math.abs(newDiff);
        bestImage = image;
      }
    }
    bestImage.Name = group.FriendlyName;  // not sure if this will work
    return bestImage;
  }

function showSlidesFractal3D() {
  let i;
  let slides = document.getElementsByClassName("slides3D");
  let dots = document.getElementsByClassName("dot3D");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex3D++;
  if (slideIndex3D > slides.length) {slideIndex3D = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex3D-1].style.display = "block";  
  dots[slideIndex3D-1].className += " active";
  setTimeout(showSlidesFractal3D, 4000); // Change image every 4 seconds
}

function showSlidesFractals() {
  let i;
  let slides = document.getElementsByClassName("slidesFractals");
  let dots = document.getElementsByClassName("dotFractals");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndexFractals++;
  if (slideIndexFractals > slides.length) {slideIndexFractals = 1}    
    for (i = 0; i < dots.length; i++) {
     dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndexFractals-1].style.display = "block";  
  dots[slideIndexFractals-1].className += " active";
  if(firstFractalTime == false){
    firstFractalTime = true;
    setTimeout(showSlidesFractals, 5000); // Start with 5 seconds
  }
  else
  {
    setTimeout(showSlidesFractals, 4000); // Change image every 4 seconds
  }
}

function showSlidesAutomata() {
  let i;
  let slides = document.getElementsByClassName("slidesAutomata");
  let dots = document.getElementsByClassName("dotAutomata");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndexAutomata++;
  if (slideIndexAutomata > slides.length) {slideIndexAutomata = 1}    
    for (i = 0; i < dots.length; i++) {
     dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndexAutomata-1].style.display = "block";  
  dots[slideIndexAutomata-1].className += " active";
  if(firstAutomataTime == false){
    firstAutomataTime = true;
    setTimeout(showSlidesAutomata, 6000);   // Start with 6 seconds
  }
  else
  {
    setTimeout(showSlidesAutomata, 4000);  // Change image every 4 seconds
  }
}

function showSlidesAttractors() {
  let i;
  let slides = document.getElementsByClassName("slidesAttractors");
  let dots = document.getElementsByClassName("dotAttractors");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndexAttractors++;
  if (slideIndexAttractors > slides.length) {slideIndexAttractors = 1}    
    for (i = 0; i < dots.length; i++) {
     dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndexAttractors-1].style.display = "block";  
  dots[slideIndexAttractors-1].className += " active";
  if(firstAttractorsTime == false){
    firstAttractorsTime = true;
    setTimeout(showSlidesAttractors, 7000);   // Start with 6 seconds
  }
  else
  {
    setTimeout(showSlidesAttractors, 4000);  // Change image every 4 seconds
  }
}

function onSlideClicked(library, slide_index){
  index = 0;
  if(library == "Fractals"){
    index = slide_index + firstIndexFractals;
  }
  else if(library == "Fractal3d"){
    index = slide_index + firstIndex3D;
  }
  else if(library == "Automata"){
    index = slide_index + firstIndexAutomata;
  }
  else if(library == "Attractors"){
    index = slide_index + firstIndexAttractors;
  }
  else{
    alert("Unknown library: " + library);
  }

  var params = new URLSearchParams();
  params.append("library", library);
  params.append("index", JSON.stringify(index));

  var url = "Single.html?" + params.toString();
  location.href = url;
}
    