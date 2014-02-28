# PreggoPredict

### Kleine is the project codename for the website [preggopredict.com](http://preggopredict.com).

I created [PreggoPredict](http://preggopredict.com) as a fun little side project to try out some new technologies. It was also a way to engage our friends and family members during our pregnancy by guessing what gender, weight, length they thought the baby would be. And also allowing them to guess the date and time they thought the baby would be born.

**Site Preview:**

[![](http://i.imgur.com/atWFBBP.png)](http://demo.preggopredict.com)

**Responsive Preview:**

[![](http://i.imgur.com/QZvUCsS.png)](http://demo.preggopredict.com)

If you want to see what the contest portion of the website looked like, check out [http://demo.preggopredict.com](http://demo.preggopredict.com). To see the final results you can see the finished contest page at [http://preggopredict.com](http://preggopredict.com)

Keep in mind this project is no-where near complete. There a few little hacks here and there in order to get the site shipped before the baby arrived.

## Technologies / Libraries 
I approached this project as an opportunity to build a single page web application from top to bottom. I knew a few things going into this project. I know I wanted to learn AngularJS, I wanted to write the backend web api with ServiceStack, and I knew I wanted to make a responsive design and not be tied to the un-usable markup that one produces when relying on twitter bootstrap if they try to switch away mid project.

### The libraries I used are:
 - [ServiceStack](https://servicestack.net/) - Back end API
 - [AngularJS](http://angularjs.org/) - Front end MVVM framework
 - ~~TypeScript~~ - Decided learning AngularJS while learning TypeScript at the same time was insane
 - [UI-Router](https://github.com/angular-ui/ui-router) - Nested Angular Routing
 - [Font-Awesome](http://fortawesome.github.io/Font-Awesome/) - Icons
 - [LESS](http://lesscss.org/) - Simplified CSS creation and maintenance
 - Hand Rolled Responsive CSS
 - [Visual Studio 2013](http://visualstudio.com/) - IDE
  - [Web Essentials 2013 Extension](http://vswebessentials.com/)

### ServiceStack - Back end API

#### What is ServiceStack? 
[ServiceStack](https://servicestack.net/) is an open source framework that has been created as a complete replacement for [WCF, WebAPI.](http://stackoverflow.com/questions/15927475/servicestack-request-dto-design/15941229#15941229) EntityFramework, and now even Asp.NET MVC. 

It has quite a few wonderful gems baked into it that makes your life much easier, the list is very long but the notable ones I used are:
- Insanely Easy http API implementation, with a focus on [building a message based web service](https://github.com/ServiceStack/ServiceStack/wiki/What-is-a-message-based-web-service%3F).
- Custom url routing
- [IOC / Dependency Injection](https://github.com/ServiceStack/ServiceStack/wiki/The-IoC-container)
- [OrmLite + Dapper.Net](https://github.com/ServiceStack/ServiceStack.OrmLite) - POCO ORM with simple database helper methods that allow you to write a clean and abstracted data layer with minimal work with no XML configuration files!
- [Other reasons for ServiceStack?](https://github.com/ServiceStack/ServiceStack/wiki/Why-Servicestack)	

#### Sample ServiceStack web API code for preggopredit.com
ServiceStack automatically generates a page that documents your web api. It's served from /metadata by default. You can see the [PreggoPredict metadata page](http://preggopredict.com/api/metadata) and see the methods below listed on the self documenting page.

Here is my web API service interface [IKleineService.cs](/src/Kleine/Services/IKleineService.cs):

```csharp
    public interface IKleineService
    {
        ProfilePrediction Get(ProfileGet request);
        ProfilePrediction Post(ProfileCreate request);
        ProfilePrediction Put(ProfileUpdate request);
        ProfilePrediction Put(PredictionUpdate request);
        ResultsAggregate Get(ResultsRequest request);
        List<PredictionPlacement> Get(RankingsRequest request);
    }
```	

And my profile Request objects, route attributes on the request classes define the api method's url:

```csharp
    [Route("/profile", "GET")]
    public class ProfileGet : IReturn<ProfilePrediction>
    {
        public string code { get; set; }
    }

    [Route("/profile", "POST")]
    public class ProfileCreate : Profile, IReturn<ProfilePrediction> { }

    [Route("/profile", "PUT")]
    public class ProfileUpdate : Profile, IReturn<ProfilePrediction> { }    	
```

Besides the actual implementation of each IKleineService method, these few lines help me define the shape of my web API.

My [KleineServiceApi.cs](/src/Kleine.Services/KleineServiceApi.cs) file implements IKleineService and inherits from ServiceStack.Service which does all of the heavy lifting.

#### ServiceStack - IOC / Dependency Injection using Funq
When I shipped the project I was using dependency injection, but not completely. I've refactored [AppHost.cs](/src/Kleine.Website/AppHost.cs) to take full advantage of IOC using Funq. Now with a simple preprocessory flip, the site can be made to run against a SqlServer database or a simple in memory implementation of the data repositories.

    #define MEMORYSTORAGE

Can be removed to run against a Microsoft SQL Server database.

### AngularJS - Front end MVVM framework
I intially made the terrible mistake of trying to learn two technologies at the same time. I was trying to use TypeScript along with AngularJS. As a fairly new framework, Angular's documentation isn't the most complete. Of course there is an even smaller subset of users or even documentation for those trying to write an Angular site with TypeScript.

Angular is a very neat framework. It has a ton of features, many of which I didn't touch. I ended up side stepping Angular's built in routing and templating engine in favor of ui-router to help implement the nesting of views, nested states, and nested routing that I was planning on doing.

### UI-Router - Nested Angular Routing
_More information coming soon._

### Font-Awesome - Icons
_More information coming soon._

### LESS - Simplified CSS creation and maintenance
_More information coming soon._

### Hand Rolled Responsive CSS
_More information coming soon._

### Visual Studio 2013 - IDE
_More information coming soon._

#### Web Essentials 2013 Plugin
[Web Essentials 2013 - Download Page](http://visualstudiogallery.msdn.microsoft.com/56633663-6799-41d7-9df7-0f2a504ca361)

_More information coming soon._
