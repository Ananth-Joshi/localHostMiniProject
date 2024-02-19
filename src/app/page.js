import DetailsCard from "./components/DetailsCard"
import LandingHero from "./components/LandingHero"

function Dashboard() {
  return (
    <div className="flex flex-col">
      <LandingHero/>
      <div id="getStarted">
        <h1 className="flex my-10 text-4xl justify-center">GET STARTED</h1>
        <DetailsCard imageLink={'https://kettocdn.gumlet.io/media/campaign/636000/636097/image/62b332b04fed8.jpg?w=768&dpr=1.3'}
        heading={'Rescue Injured Animals'} text={'See a list of volunteers along with contacts who can help'}/>
        <DetailsCard imageLink={'https://www.usnews.com/object/image/0000016f-8b16-da7f-a97f-fb3709710000/200109-veterinarian-stock.jpg?update-time=1578586935081&size=responsive970'}
        heading={'Expert On Their Duty'} text={'Our centers have experts who excel in animal care including certified VETs'}
        />
        <DetailsCard imageLink={'https://swiftmedia.s3.amazonaws.com/mountain.swiftcom.com/images/sites/7/2022/08/29195139/8b348407-0aff-5874-ad44-7f2fff4c68c7-1024x682.jpg'}
        heading={'24X7 Animal Care'} text={'The rescue centers here offer quality of life to animals to ensure they are happy.'}
        />
      </div>
    </div>
  )
}

export default Dashboard
