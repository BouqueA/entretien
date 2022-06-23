try {
    var messagearret = " ";
    var messagearrett = " ";

    const result = await fetch(`https://tsi.tadao.cityway.fr/api/TripPoint/Search?keywords=${args[0]}&maxItems=10&pointTypes=&categories=`).then(response => response.json());
    messagearret += `${result.Data[0].Name}\n`; 
    const latdep = `${result.Data[0].Latitude}`;
    const longdep = `${result.Data[0].Longitude}`;
    
    const resultt = await fetch(`https://tsi.tadao.cityway.fr/api/TripPoint/Search?keywords=${args[1]}&maxItems=10&pointTypes=&categories=`).then(response => response.json());
    messagearrett += `${resultt.Data[0].Name}\n`;
    const latarr = `${resultt.Data[0].Latitude}`;
    const longarr = `${resultt.Data[0].Longitude}`;

    (async () => { 
        const url = `https://tsi.tadao.cityway.fr/fr/itineraires/4/JourneyPlanner/result?Date=${jour}%2F${mois}%2F${annee}&TypeDate=68&Hour=${heure}&Minute=${minute}&Algorithm=Fastest&TypeTrip=PlanTrip&ListModes=Bus%7CTrain%7CTgv%7CTer%7CTod&ListPartners=3%7C4%7C2&CarDistance=25&CarLeave=0&BikeDistance=10&BikeLeave=0&BikeSpeed=10&WalkDistance=1500&WalkSpeed=4&DurationVia=30&LatDep=${latdep}&LngDep=${longdep}&LatArr=${latarr}&LngArr=${longarr}`
        
        const browser = await puppeteer.launch(
            {
              defaultViewport: null,
            });
        const page = await browser.newPage();
        await page.goto(`https://tsi.tadao.cityway.fr/fr/itineraires/4/JourneyPlanner/result?Date=${jour}%2F${mois}%2F${annee}&TypeDate=68&Hour=${heure}&Minute=${minute}&Algorithm=Fastest&TypeTrip=PlanTrip&ListModes=Bus%7CTrain%7CTgv%7CTer%7CTod&ListPartners=3%7C4%7C2&CarDistance=25&CarLeave=0&BikeDistance=10&BikeLeave=0&BikeSpeed=10&WalkDistance=1500&WalkSpeed=4&DurationVia=30&LatDep=${latdep}&LngDep=${longdep}&LatArr=${latarr}&LngArr=${longarr}`);
        await page.setViewport({ width: 1980, height: 1080});
        await page.waitForTimeout(3000);
        try {
            message.author.send(url);
            const datedep = await page.$eval('#link_solutionPlanTrip-1 > div.hours.bold.col-xs-9', el => el.textContent); // Récupère la date de départ
            const datef = datedep.replace("Itinéraire : option 1", "")
            const tempstrajet = await page.$eval('#link_solutionPlanTrip-1 > div.duration.bold.col-xs-3', el => el.textContent); // Récupère la durée du trajet
            await page.screenshot({path: 'screenshot.png'}); // Sauvegarde l'image pour visualisation du trajet
            await browser.close();
            var embed = new Discord.MessageEmbed()
        
            .setColor('#DC143C')
            .addField(`**Point de départ  :**`, `${messagearret}`) 
            .addField(`**Point d'arrivée  :**`, `${messagearrett}`) 
            .addField(`**Temps de trajet  :**`, `${tempstrajet} ${datef}`) 
            .addField(`**Lien du trajet  :**`, `Envoyé en DM !`) 
            .attachFiles('./screenshot.png')
            .setImage('attachment://screenshot.png')
            .setTimestamp();
            message.channel.send({ embed: embed})
            
        } catch (error){
            message.channel.send("Aucun trajet !")
        }

    })();

} catch(error){
    message.channel.send("Demande de trajet invalide !")
}