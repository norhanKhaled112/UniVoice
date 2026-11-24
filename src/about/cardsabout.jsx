import { faBullhorn, faUser } from '@fortawesome/free-solid-svg-icons'
import { faLightbulb } from '@fortawesome/free-regular-svg-icons'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const cards = [{
    icon: <FontAwesomeIcon icon={faBullhorn} />,
    title:'Empowring Students',
    text:'Giving every student a seat at the table to \n share constructive feedback.'
}
,
{
    icon: <FontAwesomeIcon icon={faUser} />,
    title:'Built by Students',
    text:'Created firsthand by students who understand \n campus life and everyday challenges.',

}
,{
    icon: <FontAwesomeIcon icon={faLightbulb} />,
    title:'Driving Real Change',
    text:'Bridging the gap between student feedback\n and university administration.',
}
  ]
function CardsAbout() {
    return (
        <div className="  mt-5 ml-12 text-2xl text-[var(--TextHero)] font-semibold gap-8 px-4 py-12 sm:px-6 lg:px-8">
            <h2 className='mb-8 '>Our Mission & Values</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="flex w-full flex-col items-start rounded-2xl border border-gray-200/80 bg-white p-7 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                    >
                        <div className="mb-4 text-3xl text-[var(--TextHeroSecondaryFirst)]">
                            {card.icon}
                        </div>
                        <h3 className="text-lg font-bold text[var(--TextHero)]-900">
                            {card.title}
                        </h3>
                        <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-[var(--Text)]">
                            {card.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default CardsAbout;