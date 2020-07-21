import React from 'react';

const Footer = () => {
    return (
        <div id='footer-container'>
            <div className='footer-text'>
                <div>
                    LoL Finder isn't endorsed by Riot Games and doesn't reflect the views or opinions of
                    Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot
                    Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.
            </div>
            </div>
            <div className='footer-links'>
                <a href='https://github.com/lullofthesea/'>Github</a>
                <a href='https://www.linkedin.com/in/seamus-le-4355041aa/'> LinkedIn</a>
                <a href='https://angel.co/u/seamus-le'> AngelList</a>
            </div>
        </div>
    )
}

export default Footer;