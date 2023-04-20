/* eslint-disable @next/next/no-img-element */
import React from "react";

const Footer = () => {
  return (
    <footer>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2400.4251504538133!2d18.6096475160615!3d53.01271987991048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470335d642181bb3%3A0xf5fe495cdc1eacf7!2sKloniecki%20osteopatia%20i%20fizjoterapia!5e0!3m2!1sen!2spl!4v1680247324390!5m2!1sen!2spl"
        title="Gabinet osteopatii w Toruniu"
        width="100%"
        height="250"
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="bg-gray-100">
        <h5 className="p-2 text-center">Osteopatia i Fizjoterapia, Szymon Kloniecki, All Rights Reserved 2023 ®</h5>
      </div>
    </footer>
  );
};

export default Footer;
