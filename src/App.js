/* 
TODO:
random quote - DONE
positioning - DONE
random color - DONE
font - DONE
animations - DONE
quotebox size change to fit
mobile/responsive
twitter share button
*/


import React from 'react'
import {useState, useEffect} from 'react'
import {getQuotes} from './services/Quote'
import {createUseStyles} from 'react-jss'
import './index.css' // box sizing and stuff

const ANIMATION_DURATION_SECONDS = 2

const useStyles = createUseStyles({
    container: {
        width: '100%',
        height: '100%',

        '& *': {
            margin: 0
        },
        backgroundColor: color => color,
        fontFamily: 'Mandali, sans-serif',
        transition: `all ${ANIMATION_DURATION_SECONDS}s`
    },
    quoteBox: {
        // center
        position: 'absolute',
        top: '30%',
        left: '25%',
        // size 
        width: '50%',
        height: '40%',
        // center inside
        padding: '30px',
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        // other stuff
        backgroundColor: '#ffffff',
        color: color => color,
        transition: `all ${ANIMATION_DURATION_SECONDS}s`,
    },
    newQuoteBtn: {
        // size and position
        border: 'none',
        width: '20%',
        height: '10%',
        borderRadius: '5px',
        // other stuff
        backgroundColor: color => color,
        color: '#ffffff',
        transition: `all ${ANIMATION_DURATION_SECONDS}s`
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
