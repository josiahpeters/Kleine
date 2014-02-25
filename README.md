# Kleine

This project is what runs http://preggopredict.com. I created PreggoPredict as a fun little side project to try out some new technologies. It was also a way to engage our friends and family members during our pregnancy by guessing what gender, weight, length they thought the baby would be. And also allowing them to guess the date and time they thought the baby would be born.

## Technologies / Libraries 
 - [ServiceStack](https://servicestack.net/) - Back end API
 - [AngularJS](http://angularjs.org/) - Front end MVVM framework
 - [UI-Router](https://github.com/angular-ui/ui-router) - Nested Angular Routing
 - [Font-Awesome](http://fortawesome.github.io/Font-Awesome/) - Icons
 - [LESS](http://lesscss.org/) - Simplified CSS creation and maintenance
 - Hand Rolled Responsive CSS
 - [Visual Studio 2013](http://visualstudio.com/) - IDE
  - [Web Essentials 2013 Extension](http://vswebessentials.com/)

I'd like to explain why I chose each framework and any feelings I about them since completing the project. 
 
## ServiceStack - Back end API

### What is ServiceStack? 
 - "ServiceStack started development in 2008 with the mission of creating a best-practices services framework with an emphasis on simplicity and speed, reducing the effort in creating and maintaining resilient message-based SOA Services and rich web apps." - ServiceStack.net
 - [Why ServiceStack?](https://github.com/ServiceStack/ServiceStack/wiki/Why-Servicestack)	

Here is my web API service interface:

    public interface IKleineService
    {
        ProfilePrediction Get(ProfileGet request);
        ProfilePrediction Post(ProfileCreate request);
        ProfilePrediction Put(ProfileUpdate request);
        ProfilePrediction Put(PredictionUpdate request);
        ResultsAggregate Get(ResultsRequest request);
        List<PredictionPlacement> Get(RankingsRequest request);
    }
	
And my profile Request objects:

    [Route("/profile", "GET")]
    public class ProfileGet : IReturn<ProfilePrediction>
    {
        public string code { get; set; }
    }

    [Route("/profile", "POST")]
    public class ProfileCreate : Profile, IReturn<ProfilePrediction> { }

    [Route("/profile", "PUT")]
    public class ProfileUpdate : Profile, IReturn<ProfilePrediction> { }    	
	
Besides the implementation of each IKleineService method, these few lines help me define the shape of my web API. 

My KleineServiceApi.cs file implements IKleineService and inherits from ServiceStack.Service which does all of the heavy lifting.

How did I come to use ServiceStack?
- A couple years ago I was getting annoyed with System.Json including object type data in the serialized JSON for object graphs. I decided we needed better JSON serialization for an ASP.NET MVC3 product we were building. I came across a Stack Overflow response someone made with benchmarks for different JSON serialization libraries. I saw the benchmarks for ServiceStack.Text and how fast and easy it was to use and immediately decided to use them with ServiceStack.Text. I used nuget to "install-package ServiceStack.Text" and was immediately sold from then on based on how easy and fast it was to use. After that project was completed I begin to look into this "ServiceStack" framework and saw that they had other offerings including a full stack replacement for WCF! I started experimenting with their framework and have been hooked since then.

## AngularJS - Front end MVVM framework

## UI-Router - Nested Angular Routing

## Font-Awesome - Icons

## LESS - Simplified CSS creation and maintenance

## Hand Rolled Responsive CSS

## Visual Studio 2013 - IDE

### Web Essentials 2013 Plugin

[Download Page](http://visualstudiogallery.msdn.microsoft.com/56633663-6799-41d7-9df7-0f2a504ca361)