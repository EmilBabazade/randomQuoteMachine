import React from 'react'
import {useState, useEffect} from 'react'
import {getQuotes} from './services/Quote'



const App = () => {
    const [currQuote, setCurrQuote] = useState({
        author: '1', quote: '1'
    })
    const [quotes, setQuotes] = useState([])

    // initialize quotes and currentQuote
    useEffect(() => {
        getQuotes()
            .then(quotes => {
                setQuotes(quotes)
                const index = Math.floor(Math.random() * (quotes.length - 1))
                setCurrQuote(quotes[index])
            })
    }, [])

    return (
        <div>
            {currQuote.quote}
            {/* {currQuote.author} */}
        </div>
    )
}

export default App
