import {faSquareLinkedin,faGithub} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const teamMembers = [
    {
        name:'Norhan Khaled',
        role:'Frontend Developer',
        linkedin:'https://www.linkedin.com/in/norhan-khaled-81bb97332/',
        github:'https://github.com/norhanKhaled112'

    },
    {
        name:'Kholoud Rashed',
        role:'Backend Developer',
        linkedin:'https://www.linkedin.com/in/kholoud-rashid-b31136275/',
        github:'https://github.com/KholoudRashed14'
    },
    { 
         name:'Malak Mohamed',
        role:'UI/UX Designer',
        linkedin:'https://www.linkedin.com/in/malak-mohamed-965a96341/',
        github:'https://github.com/malakmohamed800-byte'

    }
]
function TeamAbout() {

    return (
        <div className=" ml-20 mt-15">
            <h2 className="text-2xl font-bold mb-8 text-[var(--TextHero)]">Meet Our Student Team</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {teamMembers.map((member, index) => (
                    <div key={index} className="bg-white  mr-9 mb-5 border-gray-200/80 border-1 rounded-lg shadow-md p-4">
                        <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                        <p className="text-gray-600 mb-4">{member.role}</p>
                        <div className="flex space-x-4">
                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                                <FontAwesomeIcon icon={faSquareLinkedin} />
                            </a>
                            <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
                                <FontAwesomeIcon icon={faGithub} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default TeamAbout;