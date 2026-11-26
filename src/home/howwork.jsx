import first from '../assets/image/first.svg';
import second from '../assets/image/second.svg';
import third from '../assets/image/third.svg';

const cards = [
    {
        photo: first, 
        title: 'Voice Your Issue',
        text: 'Submit academic, facility, or campus life complaints easily',
    },
    {
        photo: second,
        title: 'Track Real-Time Progress',
        text: 'Watch your ticket move through review, department assignment, and resolution.',
    },
    {
        photo: third,
        title: 'See Real Resolution',
        text: 'Administration takes direct action, publishing updates on resolved issues.',
    },
];

function HowWork() {
    return (
        <div className='text-center'>
            <div className=' my-10 '>
                <h2 className='text-2xl font-bold  text-[var(--TextHero)]'>How UniVoice Works</h2>
                <p className='text-base sm:text-lg font-semibold text-[var(--TextHeroSecondaryFirst)] tracking-wide'>A simple 3-step process to make your voice heard.</p>
            </div>
            <div className="grid mx-5 mb-10 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="flex w-full flex-col items-start rounded-2xl border border-gray-200/80 bg-white p-7 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                    >
                        <div className="mb-4">
                          
                            <img
                                src={card.photo}
                                alt={card.title}
                                className="h-16 w-16 object-contain"
                            />
                        </div>
                        <h3 className="text-lg font-bold text-[var(--TextHero)]">
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

export default HowWork;