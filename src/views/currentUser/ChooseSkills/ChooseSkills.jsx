import { useState, useEffect } from "react";
import { getSkills } from "../../../services/SkillService";
import { updateCurrentUser } from "../../../services/UserService";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { OverlayTrigger } from "react-bootstrap";
import { Tooltip } from "react-bootstrap";

import './ChooseSkills.css';

const ChooseSkills = ({ setSkillsSelected }) => {
    const [skills, setSkills] = useState([]);
    const { user, getUser } = useAuthContext();
    const [selectedTeachSkills, setSelectedTeachSkills] = useState([]);
    const [selectedLearnSkills, setSelectedLearnSkills] = useState([]);
    const userCurrentTeachSkills = user ? user.teachSkills.map((skill) => skill.id) : [];
    const userCurrentLearnSkills = user ? user.learnSkills.map((skill) => skill.id) : [];
    const userHasSkills = user && user.teachSkills.length > 0 && user.learnSkills.length > 0;
    const [activeButtonTeach, setActiveButtonTeach] = useState(null);
    const [activeButtonLearn, setActiveButtonLearn] = useState(null);
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


    const handleButtonClickTeach = (button) => {
        if (button === activeButtonTeach) {
            setActiveButtonTeach(null);
        } else {
            setActiveButtonTeach(button);
        }
    }

    const handleButtonClickLearn = (button) => {
        if (button === activeButtonLearn) {
            setActiveButtonLearn(null);
        } else {
            setActiveButtonLearn(button);
        }
    }

    return (
        <div className="skills-margin">
            <div className="ChooseSkills choose-skills-container container">
                <div className="choose-skills-title">
                    <h1>Habilidades</h1>
                    <hr />
                </div>
                <form onSubmit={handleSaveSkills}>
                    <div className="row">
                        <div className="teachSkills">
                            <div className="choose-category-title">
                                <h4>Elige una o dos habilidades que puedes enseñar</h4>
                                <hr />
                            </div>
                            <div className="">
                                {Object.entries(skillsByCategory).map(([category, skillsInCategory]) => (
                                    <div className="category-buttons" key={category}>
                                        <button type="button" className={`skills-category-button ${activeButtonTeach === category ? 'active' : ''}`} onClick={() => handleButtonClickTeach(category)}>
                                            <h5 className="">{category}</h5>
                                        </button>
                                        {activeButtonTeach === category && skillsInCategory.map((skill) => (
                                            <label key={skill.id} className="d-flex mb-2 mt-3 align-items-start">
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

                        </div>
                    </div>

                    <div className="row">
                        <div className="learnSkills mt-4">
                            <div className="choose-category-title">
                                <h4>Elige una o dos habilidades que quieres aprender</h4>
                                <hr />
                            </div>
                            {Object.entries(skillsByCategory).map(([category, skillsInCategory]) => (
                                <div className="category-buttons" key={category}>
                                    <button type="button" className={`skills-category-button ${activeButtonLearn === category ? 'active' : ''}`} onClick={() => handleButtonClickLearn(category)}>
                                        <h5 className="">{category}</h5>
                                    </button>
                                    {activeButtonLearn === category && skillsInCategory.map((skill) => (
                                        <label key={skill.id} className="d-flex mb-2 mt-3 align-items-start">
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
                    </div>
                    <div className="btn-container skills-submit-button submit-button d-flex align-items-center justify-content-center mt-3">
                        <button type="submit" className="btn btn-primary">Enviar</button>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default ChooseSkills;