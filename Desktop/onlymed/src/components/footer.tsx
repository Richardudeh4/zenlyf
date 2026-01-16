import twitter from "../assets/twitter.png";
import instagram from "../assets/instagram.png";
import linkedIn from "../assets/linkedin.png";


export const footerLinks = [
 
  {
      title: "Help",
      links: [
          { name: "About us", link: "/" },
          { name: "FAQs", link: "/" },
          { name: "How it works", link: "/" },
          { name: "Privacy policy", link: "/" },
          { name: "Payment policy", link: "/" },
      ],
  },
  {
      title: "Get in touch",
      links: [
          { name: "Onlymed@onlymed.net", link: "paris:Onlymed@onlymed.net" },
          // { name: "+2349061687903", link: "tel:+2349061687903" },
      ],
  },
];

const socialMedia = [
  { src: instagram , alt: "instagram", link: "https://www.instagram.com/onlymedhealth"},
  { src: twitter, alt: "twitter", link: "https://www.instagram.com/onlymedhealth"},
  { src: linkedIn, alt: "linkedIn", link: "https://www.instagram.com/onlymedhealth" },
]

const Footer = () => {
  return (
    <footer className='max-container! bg-black text-white py-10! padding-x padding-t pb-8!'>
      <div className='flex justify-between items-start gap-20! flex-wrap! max-lg:flex-col!'>
        <div className='flex flex-col items-start'>
          <a href='/'>
            {/* <img
              src={footer}
              alt='logo'
              width={150}
              height={46}
              className='m-0'
            /> */}
          </a>
          <p className='mt-6! text-base! leading-7! font-montserrat! text-white-400! sm:max-w-sm!'>
     Get the very best health care service at your fingertips
          </p>
          <div className='flex items-center gap-5 mt-8!'>
            {socialMedia.map((icon) => (
              <a
                href={icon.link}
                target='_blank'
                rel='noopener noreferrer'
                className='flex justify-center items-center w-12 h-12 bg-white rounded-full'
                key={icon.alt}
              >
                <img src={icon.src} alt={icon.alt} width={24} height={24} />
              </a>
            ))}
          </div>
        </div>

        <div className='flex flex-1 justify-between lg:gap-10 gap-20 flex-wrap'>
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className='font-montserrat text-2xl leading-normal font-medium mb-6 text-white'>
                {section.title}
              </h4>
              <ul>
                {section.links.map((link) => (
                  <li
                    className='mt-3 font-montserrat text-base leading-normal text-white-400 hover:text-slate-gray'
                    key={link.name}
                  >
                    <a href={link.link}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className='flex justify-between text-white-400 mt-24 max-sm:flex-col max-sm:items-center'>
        <div className='flex flex-1 justify-start items-center gap-2 font-montserrat cursor-pointer'>
          {/* <img
            src={copyright}
            alt='copyright sign'
            width={20}
            height={20}
            className='rounded-full m-0'
          /> */}
          <p>Copyright. All rights reserved.</p>
        </div>
        <p className='font-montserrat cursor-pointer'>Terms & Conditions</p>
      </div>
    </footer>
  );
};

export default Footer;