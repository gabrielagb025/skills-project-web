import { useState, useEffect } from "react";
import { getSkills } from "../../services/SkillService";
import { updateCurrentUser } from "../../services/UserService";
import { useAuthContext } from "../../contexts/AuthContext";


const ChooseSkills = () => {
    const [ skills, setSkills ] = useState([]);
    const { user } = useAuthContext();
    const [selectedTeachSkills, setSelectedTeachSkills] = useState([]);
    const [selectedLearnSkills, setSelectedLearnSkills] = useState([]);

    useEffect(() => {
        getSkills()
        .then((skillList) => {
            setSkills(skillList)
        })
        .catch((err) => {
            console.log(err)
        })
    }, []);

    skills.sort((a, b) => {
        if (a.category < b.category) {
            return -1;
        }
        if (a.category > b.category) {
            return 1;
        }
        return 0;
    });

    const handleSaveSkills = () => {
        

        const selectedSkills = {
            teachSkills: selectedTeachSkills,
            learnSkills: selectedLearnSkills,
        };

        updateCurrentUser(user._id, selectedSkills)
            .then((response) => {
                
            })
            .catch((error) => {
               
            });
    };

    return(
        <div className="ChooseSkills container">
            <div className="teachSkills">
                <h1>Elige una o dos habilidades que puedes enseñar</h1>
                    {skills.map((skill) => (
                        <label>
                        <input
                            type="checkbox"
                            value={skill.id}
                            onChange={(e) => handleSkillChange(e, 'teach')}
                            checked={selectedTeachSkills.includes(skill.id)}
                        />
                        {skill.name}
                        {skill.category}
                        </label>
                    ))}
            </div>
            <div className="learnSkills">
                <h1>Elige una o dos habilidades que quieres aprender</h1>
                    {skills.map((skill) => (
                        <div className="skill-element" key={skill.id}>
                        <h1>{skill.name}</h1>
                        <h3>{skill.category}</h3>
                        <p>{skill.description}</p>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default ChooseSkills;