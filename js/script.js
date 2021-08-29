const displaySpinner = () =>{
    const spinner = document.getElementById("lodding")
    const clubs = document.getElementById("teamsContainer")
    spinner.classList.toggle("hidden")
    clubs.classList.toggle("hidden")
    }

const loadAllClubs =async () => {
    displaySpinner()
    try{
        const url = 'https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=English%20Premier%20League'
    const res = await fetch(url);
    const data = await res.json();
        displayData(data.teams);
    }catch(err){
        document.getElementById('header').textContent = ''; 
        document.getElementById('errorSection').style.display = 'block';
        document.getElementById('error').innerText = ' Sorry We Are Not Available Now. Please Try Again Later.'        
    }

}
loadAllClubs()

const displayData = teams => {
    displaySpinner()
    const teamsContainer = document.getElementById('teamsContainer');
    document.getElementById('header').style.display = 'block'
    teams.forEach(team=> {
        const teamContainer = document.createElement('div');
        teamContainer.classList.add('border-2', 'rounded-md', 'my-12','mx-6', 'w-64', 'h-80', 'parent')
        teamContainer.addEventListener('click', (t)=>{
            loadClubDetails(team.idTeam)
        })
        teamContainer.innerHTML = ` 
        <div class='relative h-40' style="background-image: url('${team.strStadiumThumb}'); background-size: cover;">
        <div class='absolute inset-x-0 top-20'>
        <img src='${team.strTeamBadge}' class='rounded-full w-24 mx-auto py-5' />
        </div>
        </div>
         
         <div class='text-center bg-gray-900 pt-14 pb-8 text-white'>
         <div class= 'pb-6'>
         <h3 class='text-4xl font-bold mb-2'>${team.strTeam}</h3>
         <p>${team.strStadium}</p>
         </div>
         <div> 
         <button class='2xl clubProfile font-bold text-yellow-300'> CLUB PROFILE <i class="fas fa-arrow-right"></i></button>
         </div>
         </div>
         
        `
        teamsContainer.appendChild(teamContainer)
    })
}

const loadClubDetails =async (id) =>{
    displaySpinner()
   try{
    const res = await fetch(`https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${id}`);
    const data = await res.json();
    clubDetails(data.teams[0])
   } catch(err){
       document.getElementById('header').textContent = '';       
       document.getElementById('main').textContent = '';
    document.getElementById('errorSection').style.display = 'block';
        document.getElementById('error').innerText = ' Sorry We Are Not Available Now. Please Try Again Later.'
   }
   
}

const clubDetails = info =>{
    displaySpinner()
    
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";


    span.onclick = function() {
    modal.style.display = "none";
}
    window.onclick = function(event) {
    if (event.target == modal) {
  modal.style.display = "none";
}}

const modalBody = document.getElementById('modal-body');
modalBody.innerHTML=`
                <img class='mx-auto' src="${info.strTeamBanner}" />
                <div class='flex my-4 mx-20'>
                    <div class='mr-6 w-3/4'>
                    <h1 class='text-3xl font-extrabold mb-4'>${info.strTeam}</h1>
                    <p>Full Name: <span class='font-bold'> ${info.strAlternate}</span></p>
                    <p>Slogan: <span class='font-bold'> ${info.strKeywords}</span></p>
                <p>Founded: <span class='font-bold'> ${info.intFormedYear}</span></p>
                <p>Stadium: <span class='font-bold'> ${info.strStadium}</span></p>
                <p>Stadium Capacity: <span class='font-bold'> ${info.intStadiumCapacity}</span></p>
                    </div>
                    <div class='text-gray-600 mt-12'>
                    <p class="text-justify"> ${info.strDescriptionEN.slice(0,250)}.<p>
                    <br>
                    <p class="text-justify"> ${info.strStadiumDescription.slice(0,250)}.<p>
                    </div>
                </div>
                <div class='flex'>
                    <div>
                    <img src= "${info.strTeamFanart4}" />
                    </div>
                    <div>
                    <img src= "${info.strTeamJersey}" />
                    </div>
                    <div>
                    <img src= "${info.strTeamFanart1}" />
                    </div>
                </div>
                <div class='text-center mt-4 bg-black icon'>
                <a href="https://${info.strFacebook}"><i class="fab fa-facebook-square"></i></a>
                <a href="https://${info.strInstagram}"><i class="fab fa-instagram"></i></a>
                <a href="https://${info.strTwitter}"><i class="fab fa-twitter-square"></i></a>
                <a href="https://${info.strYoutube}"><i class="fab fa-youtube-square"></i></a>
                </div>`
}

