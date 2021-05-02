/* 
TODO:
random quote - DONE
positioning - DONE
random color - DONE
font - DONE
animations - DONE
quotebox size change to fit - DONE
mobile/responsive - DONE
twitter share button
test on mobile
*/


import React from 'react'
import {useState, useEffect} from 'react'
import {getQuotes} from './services/Quote'
import {createUseStyles} from 'react-jss'
import './index.css' // box sizing and stuff

const ANIMATION_DURATION_SECONDS = 2

const useStyles = createUseStyles({
    container: {
        width: '100vw',
        height: '100vh',

        '& *': {
            margin: 0
        },
        backgroundColor: color => color,
        fontFamily: 'Mandali, sans-serif',
        transition: `background-color ${ANIMATION_DURATION_SECONDS}s`
    },
    quoteBox: {
        // center
        position: 'absolute',
        top: '30%',
        left: '30%',
        right: '30%',
        // size 
        width: 'auto',
        height: 'auto',
        // center inside
        padding: '30px',
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        // other stuff
        backgroundColor: '#ffffff',
        color: color => color,
        transition: `color ${ANIMATION_DURATION_SECONDS}s`,
    },
    '@media screen and (max-width: 1550px)': {
        quoteBox: {
            left: '15%',
            right: '15%'
        }
    },
    '@media screen and (max-width: 600px)': {
        quoteBox: {
            left: '5%',
            right: '5%'
        }
    },
    newQuoteBtn: {
        // size and position
        border: 'none',
        padding: '5px',
        width: 'auto',
        height: '10%',
        borderRadius: '5px',
        // other stuff
        backgroundColor: color => color,
        color: '#ffffff',
        transition: `background-color ${ANIMATION_DURATION_SECONDS}s`
    }
})

const colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#73A857'
]

const App = () => {
    const [currQuote, setCurrQuote] = useState(null)
    const [quotes, setQuotes] = useState([])

    const randomColorIndex = () => Math.floor(Math.random() * (colors.length - 1))
    const [currColor, setCurrColor] = useState(colors[randomColorIndex()])

    const styles = useStyles(currColor)

    // initialize quotes and currentQuote
    useEffect(() => {
        getQuotes()
            .then(quotes => {
                setQuotes(quotes)
                const index = Math.floor(Math.random() * (quotes.length - 1))
                setCurrQuote(quotes[index])
            })
    }, [])
    
    // Move to another random quote
    const newQuote = evt => {
        evt.preventDefault()
        const quoteIndex = Math.floor(Math.random() * (quotes.length - 1))
        setCurrQuote(quotes[quoteIndex])
        setCurrColor(colors[randomColorIndex()])
    }

    if(currQuote) 
        return (
            <div className={styles.container}>
                <div className={styles.quoteBox}>
                    <h1>{currQuote.quote}</h1>
                    <p>- {currQuote.author}</p>
                    <button className={styles.newQuoteBtn} onClick={newQuote}>New Quote</button>
                </div>
            </div>
        )
    
    // TODO: throw 404
    return null
}

export default App
