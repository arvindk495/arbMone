import { useState, useEffect } from "react"
import { walletConnect, checkIfAccountChanged } from "./functions/mostUsedFunctions";
import { ethers } from "ethers";
import erc20abi from "./erc20abi.json"
import Message from "./componant/Message";
import { allowList, root } from "./functions/allowlist";
import CryptoRoadmap from "./componant/CryptoRoadmap";
import OpenModal from "./componant/OpenModal";
import Tokenomics from "./componant/Tokenomics";

const Home = () => {
    const [wallet, SetWallet] = useState('')
    const [claimTokentButton, setClaimTokentButton] = useState('Claim Token')
    const [isMessage, setIsMessage] = useState('')
    const [msgVisibility, setSsgVisibility] = useState(false)




    const ShowMessage = (msg, error) => {
        let setClearTime = setTimeout(() => {
            setSsgVisibility(false)
        }, 6000)
        setSsgVisibility(true)
        return (<Message messageText={msg} clear={setClearTime} error={error} />)
    }


    const [contractInfo, setContractInfo] = useState({
        address: "",
        tokenName: "",
        tokenSymbol: "",
        totalSupply: "",
        publicClaimStarted: "",
        totalClaimableToken: "",
        claimedToken: "",
        claimableToken: "",
        AllowClaim: "",
    });

    const [balanceInfo, setBalanceInfo] = useState({
        address: "-",
        balance: "-"
    });

    const checkContractDetails = async (e) => {

        try {
            const data = '0x4FDdBE8E89240478CEe5C4193c883Ff4B5067311';
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            const erc20 = new ethers.Contract(data, erc20abi, provider);

            const tokenName = await erc20.name();
            const tokenSymbol = await erc20.symbol();
            let totalSupply = await erc20._totalSupply();
            totalSupply = totalSupply.toString()
            const publicClaimStarted = await erc20.isPublicClaimEnabled();
            let totalClaimableToken = await erc20.totalClaimableToken();
            totalClaimableToken = totalClaimableToken.toString()
            let claimedToken = await erc20.claimedToken();
            claimedToken = claimedToken.toString()
            let claimableToken = await erc20.claimableToken();
            claimableToken = claimableToken.toString()
            let AllowClaim = await erc20.AllowClaim();
            AllowClaim = AllowClaim.toString()



            setContractInfo({
                address: data,
                tokenName,
                tokenSymbol,
                totalSupply,
                publicClaimStarted,
                totalClaimableToken,
                claimedToken,
                claimableToken,
                AllowClaim
            });
        } catch (err) {

            if (err.error != undefined) {
                setIsMessage(ShowMessage(err.data.message, true))
            } else {
                console.log(err)
            }

        }

    };


    const getMyBalance = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const erc20 = new ethers.Contract(contractInfo.address, erc20abi, provider);
            // const signer = await provider.getSigner();
            const signerAddress = wallet;
            const balance = await erc20.balanceOf(signerAddress);
            setBalanceInfo({
                address: signerAddress,
                balance: String(balance)
            });
        } catch (err) {
            if (err.data != undefined) {
                setIsMessage(ShowMessage(err.data.message, true))
            } else {
                console.log(err)
            }

        }

    };

    const claimToken = async () => {
        if (!wallet == '') {
            setClaimTokentButton('Processing....')
            let data = allowList(wallet)
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();
                const erc20 = new ethers.Contract(contractInfo.address, erc20abi, signer);
                let check = await erc20.claim(data[0], data[1]);
                console.log(check)
                setIsMessage(ShowMessage(check.hash, false))
            } catch (err) {
                if (err.data != undefined) {
                    setIsMessage(ShowMessage(err.data.message, true))
                } else {
                    console.log(err)
                }
            }
            setClaimTokentButton('Claim Token')
        } else {

            setIsMessage(ShowMessage('Connect Your Wallet', true))
        }

    }
    useEffect(() => {
        checkIfAccountChanged(SetWallet)
        checkContractDetails()
        getMyBalance()
        walletConnect(SetWallet)
    }, [wallet]);

    useEffect(() => {

        root()
    }, [])


    console.log(contractInfo, 'contractInfo')
    console.log(isMessage, 'isMessage')
    return (
        <>


            <aside className="side-widget">
                <div className="inner">

                    <div className="logo">
                        {" "}
                        <a href="index-2.html">
                            <img src="img/logo1.png" alt="Image" />
                        </a>{" "}
                    </div>
                    <div className="hide-mobile">
                        <div className="or">
                            <h2 className="h2-baslik-anasayfa-ozel1"> Contact Information </h2>
                        </div>
                        <div className="bosluk2dt" />
                        <div className="iconsv">
                            <i className="flaticon-call" />
                        </div>
                        <address className="address">
                            <p>
                                <a href="#">+1 (234) 567 89 10</a>
                            </p>
                            <div className="bosluk2dt" />
                            <div className="iconsv">
                                <i className="flaticon-email" />
                            </div>
                            <a href="#">example@example.com</a>
                            <div className="bosluk2dt" />
                            <div className="iconsv">
                                <i className="flaticon-location" />
                            </div>
                            <a href="#">New Jersey, USA</a>
                            <div className="bosluk2dt" />
                            <div className="or">
                                <a href="#">
                                    <img src="img/facebook1.png" alt="" />
                                </a>
                                <a href="#">
                                    <img src="img/instagram1.png" alt="" />
                                </a>
                                <a href="#">
                                    <img src="img/twitter1.png" alt="" />
                                </a>
                                <a href="#">
                                    <img src="img/google1.png" alt="" />
                                </a>
                            </div>
                            <p />
                        </address>
                    </div>
                    <div className="show-mobile">
                        <div className="site-menu">
                            <ul className="menueffect">
                                <li>
                                    <a href="#">Home</a>
                                </li>
                                <li>
                                    <a href="#">About Us</a>
                                </li>

                                <li>
                                    <a href="#">Blog</a>
                                </li>
                                <li>
                                    <a href="#">Contact</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <small>© 2023 - ArbMonke</small>{" "}
                </div>
            </aside>
            <nav className="navbar">
                <div className="container">

                    {/* Logo Menu Desktop */}
                    <div className="logo">
                        {" "}
                        <a href="index-2.html">
                            <img src="img/logo1.png" alt="Image" />
                        </a>{" "}
                    </div>
                    <div className="site-menu">
                        <ul className="menueffect">
                            <li>
                                <a href="#">Home</a>
                            </li>
                            <li>
                                <a href="#">About Us</a>
                            </li>

                            <li>
                                <a href="#">Blog</a>
                            </li>
                            <li>
                                <a href="#">Contact</a>
                            </li>
                        </ul>
                    </div>
                    <div className="hamburger-menu">
                        {" "}
                        <span /> <span /> <span />{" "}
                    </div>
                    <div className="navbar-button " onClick={() => walletConnect(SetWallet)}>
                        {
                            wallet == '' ? <a href="#">Connect Wallet</a> : (


                                <a href="#">{wallet.split('').map((data, index) => index < 5 ? data : index > 5 && index < 9 ? '.' : index > 36 ? data : null)}</a>

                            )
                        }



                    </div>
                </div>
            </nav>
            {/*Banner Effect Section*/}
            <section className="banner-sc">
                {msgVisibility ? isMessage : null}

                <div className="h-yazi-ozel h-yazi-margin-ozel"></div>
                <div className="tablo">
                    <div className="tablo--1-ve-2 wow fade">
                        <div className="bosluk333" />
                        <h4
                            className="h2-baslik-anasayfa-ozel wow fadeInUp fancy"
                            data-wow-delay="0.3s"
                        >
                            Claim ArbMonke Token
                        </h4>
                        <div className="bosluk333" />
                        <div className="bosluk9" />
                        <p className="paragraf wow fadeInUp" data-wow-delay="0.4s">
                            ArbMonke tokens that have not been claimed within 31 days will be used for the Community Long-Term Incentive Reward Program.
                            The ArbMonke will be distributed to the top contributors of Arbitrum community and burned.
                        </p>
                        <div className="bosluk333" />
                        <div className="bosluk333" />
                        <div className="container3 wow fadeInUp" data-wow-delay="0.5s">
                            <h2 id="headline" className="head">
                                Start Airdrop Without Wasting Time
                            </h2>
                            <div id="countdown">
                                <ul>
                                    <li className="countdown1">
                                        <span id="days" />
                                        days
                                    </li>
                                    <li className="countdown2">
                                        <span id="hours" />
                                        Hours
                                    </li>
                                    <li className="countdown3">
                                        <span id="minutes" />
                                        Minutes
                                    </li>
                                    <li className="countdown4">
                                        <span id="seconds" />
                                        Seconds
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="row">
                            {
                                contractInfo.publicClaimStarted ? (
                                    <>
                                        <div className="col-sm-6 wow fadeInLeft" data-wow-delay="0.6s" onClick={() => claimToken()}>
                                            <a href="#" className="custom-button-white">
                                                <i className="flaticon-bitcoin iconbutton" /> {claimTokentButton}
                                            </a>
                                        </div>

                                    </>
                                ) : (
                                    <>
                                        <div className="col-sm-6 wow fadeInLeft" data-wow-delay="0.6s" >
                                            <a href="#" className="custom-button-white">
                                                <i className="flaticon-bitcoin iconbutton" /> {'Not Started'}
                                            </a>
                                        </div>
                                    </>
                                )
                            }
                            <div className="col-sm-6 wow fadeInLeft" data-wow-delay="0.7s">
                                <a href="#" className="custom-button">
                                    <i className="flaticon-analysis iconbutton" />
                                    White Papers
                                </a>
                                <br />
                            </div>
                        </div>
                    </div>
                    {/*Slider Image Alanı*/}
                    <div className="tablo--1-ve-2 wow fade">
                        <div className="hero1 wow fadeInUp" data-wow-delay="0.8s">
                            <img className="imagerotate1" src="img/hero-cryptoce-1.png" alt="" />
                        </div>
                        <div className="hero2 wow fadeInUp" data-wow-delay="0.9s">
                            <img className="imagerotate2" src="img/hero-cryptoce-2.png" alt="" />
                        </div>
                        <div className="hero3 wow fadeInUp" data-wow-delay="1s">
                            <img className="imagerotate3" src="img/hero-cryptoce-3.png" alt="" />
                        </div>
                        <div className="hero4 wow fadeInUp" data-wow-delay="1.1s">
                            <img className="imagerotate4" src="img/hero-cryptoce-4.png" alt="" />
                        </div>
                        <div className="hero5 wow fadeInUp" data-wow-delay="1.2s">
                            <img className="imagerotate5" src="img/hero-cryptoce-5.png" alt="" />
                        </div>
                        <div className="hero6 wow fadeInUp" data-wow-delay="1.3s">
                            <img className="imagerotate6" src="img/sideimg1.png" alt="" />
                        </div>
                        <div className="hero7 wow fadeInUp" data-wow-delay="1.4s">
                            <img className="imagerotate7" src="img/section3.png" alt="" />
                        </div>
                        <div className="hero8 wow fadeInUp" data-wow-delay="1.5s">
                            <img className="imagerotate8" src="img/section3.png" alt="" />
                        </div>
                        <div className="boslukhm" />
                    </div>
                </div>
            </section>
            {/*  <div className="hero8">
                <img className="saimg" src="img/section4.png" alt="" />
            </div>
           <div className="boslukhm" /> */}


            <div className="bosluk4" />
            <section>


                <CryptoRoadmap />
            </section>

            <div className="bosluk4" />
<section>
    <Tokenomics />
</section>
            {/* <section className="charts-alani">
                <h2 className="h2-baslik-hizmetler-21 wow fadeInUp" data-wow-delay="0.5s">
                    Token Charts
                </h2>
                <div className="bosluk3" />
                <div className="tablo-infobox wow fadeInUp" data-wow-delay="0.6s">
                    <div className="tablo--1-ve-2">
                        <div className="livecoinwatch-widget-3" />
                    </div>
                </div>
 

            </section> */}












            <footer className="footer">
                {/*footer menu*/}
                <div className="tablo-footer">
                    <div className="ozel">
                        <div className="tablo--1-ve-5 wow fadeInUp" data-wow-delay="0.3s">
                            <img src="img/logo-footer.png" alt="Image" />
                        </div>
                        <div className="tablo--1-ve-1 wow fadeInUp" data-wow-delay="0.4s">
                            <h2 className="h2-baslik-footer h-yazi-margin-kucuk">
                                {" "}
                                Quick Links{" "}
                            </h2>
                            <div className="footer__menu wow fadeInUp" data-wow-delay="0.5s">
                                <ul className="footer__list">
                                    <li className="footer__item">
                                        <a href="#" className="footer__link">
                                            Home Page
                                        </a>
                                    </li>
                                    <li className="footer__item">
                                        <a href="#" className="footer__link">
                                            About Us
                                        </a>
                                    </li>

                                    <li className="footer__item">
                                        <a href="#" className="footer__link">
                                            Blog
                                        </a>
                                    </li>
                                    <li className="footer__item">
                                        <a href="#" className="footer__link">
                                            Contact
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="tablo--1-ve-1 wow fadeInUp" data-wow-delay="0.6s">
                            <h2 className="h2-baslik-footer h-yazi-margin-kucuk"> Address </h2>
                            <p className="footer__sosyal"></p>
                            <p className="footer-support">New Jersey, America</p>
                        </div>
                        <div className="tablo--1-ve-1 wow fadeInUp" data-wow-delay="0.7s">
                            <h2 className="h2-baslik-footer h-yazi-margin-kucuk"> Support </h2>
                            <p className="footer__sosyal"></p>
                            <p className="footer-support">example@example.com</p>
                        </div>
                        <div className="tablo--1-ve-1 wow fadeInUp" data-wow-delay="0.8s">
                            <h2 className="h2-baslik-footer h-yazi-margin-kucuk"> Follow Us </h2>
                            <p className="footer__sosyal"></p>
                            <p className="footer-support"></p>
                            <div className="footer-social">
                                <i className="flaticon-facebook" />
                                &nbsp;&nbsp;&nbsp;
                                <i className="flaticon-instagram" />
                                &nbsp;&nbsp;&nbsp;
                                <i className="flaticon-twitter" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ozel-copyright wow fadeInUp" data-wow-delay="0.9s">
                    <div className="footer__copyright">
                        © 2023 - ARB Monke - All Rights Reserved.
                    </div>
                </div>
                <div id="top" style={{ cursor: "pointer" }}>
                    <img width={50} height={50} src="img/go-top.png" alt="" />
                </div>
            </footer>



        </>
    )
}

export default Home;