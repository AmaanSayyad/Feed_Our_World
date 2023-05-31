import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { ethers } from 'ethers';
import Chain from '../../../../utils/Disaster_Management.json';
import DonationCard from './DonationCard';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';


function MyDonations() {

  const deployAddress = "0x43984da072707A9F477eC6f295128fE8A5ebd55B"

  const sample = [
    {
      "rescueInfo": "https://www.domusweb.it/content/dam/domusweb/en/news/2021/05/13/how-to-mint-your-own-nft-in-5-simple-steps/nft.jpg.foto.rbig.jpg",
    }
  ]

  const [data, setData] = useState(sample)

  const fetch = async () => {
    try {
      if(typeof window !== 'undefined') {

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(deployAddress, Chain.abi, signer)
  
        const allDonation = await contract.getAllMyDonationDetails()
  
        const items: any = await Promise.all(allDonation.map(async (i: any) => {
          let item = {
            donationId: i.donationId.toString(),
            donationInfo: i.donationInfo,
            donarAddress: i.donarAddress,
            donationPickup: i.donationPickup,
            NFTreceived: i.NFTreceived,
            donationReceived: i.donationReceived,
            donationClosed: i.donationClosed
          }
          return item;
        }))
        setData(items)
  
        console.log(items)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  const styles = {
    page: `w-screen max-w-screen-sm min-h-screen flex flex-col justify-center items-center`,
  }


  return (
    <div className="flex flex-col justify-center items-center bg-inherit">
      <div className="w-full flex justify-between">
        <Link href="/components/Project/donate/DonateDetails">
          <ArrowBackIcon fontSize='large' color='primary' />
        </Link>

        <Link href="/">
          <HomeIcon fontSize='large' color='primary' />
        </Link>
      </div>
      <div className={styles.page}>
        {

          data.length === 0 ?

          <div>
            <p className='text-sky-600 font-bold text-xl'>You don&apos;t have any donation details</p> 
            <p className='text-sky-600 font-bold text-sm'>(once you donate, the details will shown here)</p> 
          </div>
          
          :

          <Link href="/components/Project/donate/MyNFTs">
            <Button variant='contained' size='small' className='bg-sky-700'>
              <span className='text-sm capitalize'>Show My NFTs</span>
            </Button>
          </Link>

        }
        {data.map((value, index) => {
            return <DonationCard data={value} key={index} />
        })}
      </div>
    </div>
  )
}

export default MyDonations