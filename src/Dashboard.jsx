import Bodybuilding from './assets/bodybuilding.svg'
import Cycling from './assets/cycling.svg'
import Meditation from './assets/meditation.svg'
import Swimming from './assets/swimming.svg'
import Activity from './components/Charts/Activity'
import AverageSessions from './components/Charts/AverageSessions'
import Performance from './components/Charts/Performance'
import Score from './components/Charts/Score'
import { useParams } from 'react-router-dom'
import Energy from './assets/energy.svg'
import Chicken from './assets/chicken.svg'
import Apple from './assets/apple.svg'
import Cheeseburger from './assets/cheeseburger.svg'
import { useFetch } from './utils/Fetch'

/**
 * This component call the Fetch fonction to retrieves the data, then render the user's Dashboard with the differents charts.
 * 
 * @param {string} id The user id, in the form of String
 * @param {number} idFinal The user id, in the form of Number
 * @param {object} data The user's data
 * @param {boolean} isLoading The state for render only after the data are loaded
 * @returns Render the dashboard
 */

export default function Dashboard() {
    
    const { id } = useParams()

    const idFinal = Number(id)
    
    const { data, isLoading } = useFetch(`http://localhost:5500/user/${idFinal}`)

    const activityData = useFetch(`http://localhost:5500/user/${idFinal}/activity`)

    const averageSessionsData = useFetch(`http://localhost:5500/user/${idFinal}/average-sessions`)

    const performanceData = useFetch(`http://localhost:5500/user/${idFinal}/performance`)

    //Récupérer les data

    if (!isLoading) {
        return (
            <div className="home">
                <nav className='header_nav_l'>
                    <div className='header_nav_l_logos'>
                        <img src={Meditation} alt="" />
                        <img src={Swimming} alt="" />
                        <img src={Cycling} alt="" />
                        <img src={Bodybuilding} alt="" />
                    </div>
                    
                    <div className='header_nav_l_copyright'>
                        <p className='header_nav_l_copyright_text'>Copyright, SportSee 2020</p>
                    </div>
                    
                </nav>
                <div className='dashboard'>
                    <div className="dashboard_header">
                        <p className='dashboard_hello'>Bonjour <b>{data.data.userInfos.firstName}</b></p>
                        <p className='dashboard_congratulations'>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
                    </div>
                    <div className="dashboard_main">
                        <div className='dashboard_charts'>
                            
                            <Activity data={activityData} />
                            <p className='activity_title'>Activité quotidienne</p>
                            <div className='dashboard_charts_2_3_4'>
                                <AverageSessions data={averageSessionsData} />
                                <Performance data={performanceData} />
                                <Score data={data} loading={isLoading}/>
                            </div>
                            
                        </div>
                        <div className='dashboard_scores'>
                            <div className='calories'>
                                <div className='calories_logo'>
                                    <img src={Energy} alt="" />
                                </div>
                                <div className='calories_values'>
                                    <p className='calories_count'>{data.data.keyData.calorieCount}kCal</p>
                                    <p className='calories_text'>Calories</p>
                                </div>
                            </div>
                            <div className='proteins'>
                                <div className='proteins_logo'>
                                    <img src={Chicken} alt="" />
                                </div>
                                <div className='calories_values'>
                                    <p className='proteins_count'>{data.data.keyData.proteinCount}g</p>
                                    <p className='proteins_text'>Protéines</p>
                                </div>
                            </div>
                            <div className='glucides'>
                                <div className='glucides_logo'>
                                    <img src={Apple} alt="" />
                                </div>
                                <div className='calories_values'>
                                    <p className='glucides_count'>{data.data.keyData.carbohydrateCount}g</p>
                                    <p className='glucides_text'>Glucides</p>
                                </div>
                            </div>
                            <div className='lipides'>
                                <div className='lipides_logo'>
                                    <img src={Cheeseburger} alt="" />
                                </div>
                                <div className='calories_values'>
                                    <p className='lipides_count'>{data.data.keyData.lipidCount}g</p>
                                    <p className='lipides_text'>Lipides</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>Loading</div>
    )    
}