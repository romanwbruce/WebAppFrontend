
import DashboardHeader from "../../libs/dashboard/DashboardHeader";
import DashboardFooter from '../../libs/dashboard/DashboardFooter';

export default function (){

    return (
        <div>
            <DashboardHeader></DashboardHeader>

                <div className="projects">
                    <h2>Projects</h2>
                    <div className="optionsParent">
                        <div className="options">
                            <a className="active">Active Projects</a>
                            <a>New Project</a>
                        </div>
                    </div>
                    <div className="dropdownOption">
            
                            <div className="project">
                                <a>Demo1</a>
                                <a className="date">Created 1/1/2022</a>
                                <a>VIEW</a>
                            </div>
                            <div className="project">
                                <a>Demo1</a>
                                <a className="date">Created 1/1/2022</a>
                                <a>VIEW</a>
                            </div>
                            <div className="project">
                                <a>Demo1</a>
                                <a className="date">Created 1/1/2022</a>
                                <a>VIEW</a>
                            </div>


                        </div>
                </div>  
            <DashboardFooter></DashboardFooter>
        </div>
    )
}