import { useState, useEffect } from "react";
import { getSkills } from "../../../services/SkillService"; 
import { updateCurrentUser } from "../../../services/UserService"; 
import { useAuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";


const ChooseSkills = ({ setSkillsSelected }) => {
    const [skills, setSkills] = useState([]);
    const { user, getUser } = useAuthContext();
    const [selectedTeachSkills, setSelectedTeachSkills] = useState([]);
    const [selectedLearnSkills, setSelectedLearnSkills] = useState([]);
    const userCurrentTeachSkills = user ? user.teachSkills.map((skill) => skill.id) : [];
    const userCurrentLearnSkills = user ? user.learnSkills.map((skill) => skill.id) : [];
    const userHasSkills = user && user.teachSkills.length > 0 && user.learnSkills.length > 0;
    const navigate = useNavigate();

    useEffect(() => {
        getSkills()
            .then((skillList) => {
                setSkills(skillList)
            })
            .catch((err) => {
                console.log(err)
            })
            
            if (userHasSkills) {
                setSelectedTeachSkills(userCurrentTeachSkills);
                setSelectedLearnSkills(userCurrentLearnSkills);
            }
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

    const skillsByCategory = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {});

    const handleSkillChange = (e, type) => {
        const skillId = e.target.value;
        if (type === 'teach') {
            const newSelectedSkills = toggleSkill(skillId, selectedTeachSkills);
            setSelectedTeachSkills(newSelectedSkills);             
        } else if (type === 'learn') {
            const newSelectedSkills = toggleSkill(skillId, selectedLearnSkills);
            setSelectedLearnSkills(newSelectedSkills);
        }
    };

    const toggleSkill = (skillId, selectedSkills) => {
        if (selectedSkills.includes(skillId)) {
            return selectedSkills.filter((id) => id !== skillId);
        } else {
            if (selectedSkills.length < 2) {
                return [...selectedSkills, skillId];
            }
            return selectedSkills;
        }
    };

    const handleSaveSkills = (event) => {
        event.preventDefault();

        const selectedSkills = {
            teachSkills: selectedTeachSkills,
            learnSkills: selectedLearnSkills,
        };

        updateCurrentUser(selectedSkills)
            .then((response) => {
                getUser(() => navigate('/user/profile'))
            })
            .catch((err) => {
                console.error(err)
            });
    };

    return (
        <div className="ChooseSkills container">
            <form onSubmit={handleSaveSkills}>
                <div className="teachSkills">
                    <h1>Elige una o dos habilidades que puedes enseñar</h1>
                    {Object.entries(skillsByCategory).map(([category, skillsInCategory]) => (
                        <div className="mt-2" key={category}>
                            <hr />
                            <h2 className="mb-4">{category}</h2>
                            {skillsInCategory.map((skill) => (
                                <label key={skill.id} className="d-flex mb-2 align-items-start">
                                    <input
                                        type="checkbox"
                                        value={skill.id}
                                        onChange={(e) => handleSkillChange(e, 'teach')}
                                        checked={selectedTeachSkills.includes(skill.id)}
                                        className="me-2"
                                    />
                                    <div className="d-flex flex-column">
                                        <h6>{skill.name}</h6>
                                        <p>{skill.description}</p>
                                    </div>
                                </label>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="learnSkills">
                    <h1>Elige una o dos habilidades que quieres aprender</h1>
                    {Object.entries(skillsByCategory).map(([category, skillsInCategory]) => (
                        <div className="mt-2" key={category}>
                            <hr />
                            <h2 className="mb-4">{category}</h2>
                            {skillsInCategory.map((skill) => (
                                <label key={skill.id} className="d-flex mb-2 align-items-start">
                                    <input
                                        type="checkbox"
                                        value={skill.id}
                                        onChange={(e) => handleSkillChange(e, 'learn')}
                                        checked={selectedLearnSkills.includes(skill.id)}
                                        className="me-2"
                                    />
                                    <div className="d-flex flex-column">
                                        <h6>{skill.name}</h6>
                                        <p>{skill.description}</p>
                                    </div>
                                </label>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="btn-container d-flex align-items-center justify-content-center mt-3">
                    <button type="submit" className="btn btn-primary">Enviar</button>
                </div>
            </form>
        </div>
    )
}

export default ChooseSkills;