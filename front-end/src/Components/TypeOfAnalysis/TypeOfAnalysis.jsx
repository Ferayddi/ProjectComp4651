import './TypeOfAnalysis.css'
import next_icon from '../../assets/next-icon.png'
import back_icon from '../../assets/back-icon.png'
import NER from '../../assets/NER.png'
import Sentiments from '../../assets/Sentiments.png'
import WordCount from '../../assets/WordCount.png'
import {useRef} from "react";


const TypeOfAnalysis = () => {
    const slider = useRef();
    let tx = 0;
    const slideForward = () => {
        if(tx > -33) {
            tx -= 33;
        }
        slider.current.style.transform = `translateX(${tx}%)`
    }

    const slideBackward = () => {
        if(tx < 0) {
            tx += 33;
        }
        slider.current.style.transform = `translateX(${tx}%)`
    }


    return (
        <div className="typeOfAnalysis">
            <h2>Type Of Analysis</h2>
            <p>We can do NER, Word Count, and Sentiment Analysis for your dataset.</p>
            <div className="analysisSlider">
                <img src={next_icon} alt='' className="next-btn" onClick={slideForward}/>
                <img src={back_icon} alt='' className="back-btn" onClick={slideBackward}/>
                <div className="slider">
                    <ul ref={slider}>
                        <li>
                            <div className="slide">
                                <img src={NER} alt=""/>
                                <div className="analysis-info">
                                    <div>
                                        <h3>Named Entity Recognition</h3>
                                        <span>NER Analysis</span>
                                    </div>
                                </div>
                                <p>Named Entity Recognition (NER) is an NLP technique that identifies and categorizes named entities in text, such as names of people, organizations, and locations. It helps extract valuable information and improve context analysis in various applications. NER algorithms utilize machine learning to identify patterns and extract entities from unstructured text data.</p>
                            </div>
                        </li>
                        <li>
                            <div className="slide">
                                <img src={WordCount} alt=""/>
                                <div className="analysis-info">
                                    <div>
                                        <h3>Word Count</h3>
                                        <span>Word Count Analysis</span>
                                    </div>
                                </div>
                                <p>Word Count Analysis is a simple technique that counts the occurrences of words in a text. It helps identify popular terms and themes, providing valuable insights from textual data. It is widely used in literature analysis, content optimization, and social media monitoring.</p>
                            </div>
                        </li>
                        <li>
                            <div className="slide">
                                <img src={Sentiments} alt=""/>
                                <div className="analysis-info">
                                    <div>
                                        <h3>Sentiments</h3>
                                        <span>Sentiments Analysis</span>
                                    </div>
                                </div>
                                <p>Sentiment Analysis is a powerful NLP technique that categorizes emotions and opinions in text. It extracts valuable insights from textual data, aiding in understanding sentiment, feedback, and trends. Using machine learning and linguistic analysis, it identifies patterns and subjective information, empowering businesses to make informed decisions and enhance customer experiences.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TypeOfAnalysis