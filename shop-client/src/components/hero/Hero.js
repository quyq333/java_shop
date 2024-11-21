import './Hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const Hero = ({ products }) => {
    const navigate = useNavigate();



    return (
        <div className='product-carousel-container'>
            <Carousel>
                {
                    products?.map((product) => {
                        return (
                            <Paper key={product.id}>
                                <div className='product-card-container'>
                                    <div
                                        className="product-card"
                                        style={{ "--img": `url(${product.poster[0]})` }}
                                    >
                                        <div className="product-detail">
                                            <div className="product-poster">
                                                <img src={product.description} alt="" />
                                            </div>
                                            <div className="product-title">
                                                <h4>{product.title}</h4>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </Paper>
                        );
                    })
                }
            </Carousel>
        </div>
    );
};

export default Hero;
