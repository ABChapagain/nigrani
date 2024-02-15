# Introducing Nigrani: Safeguarding Villages with Elephant Detection Technology

## Detection System:

Nigrani employs a sophisticated Elephant Detection System (EDS) that utilizes Closed-Circuit Television (CCTV) cameras strategically positioned at the periphery of villages. These cameras continuously monitor the surroundings, particularly areas prone to elephant crossings. Integrated with the CCTV cameras are Raspberry Pi cameras equipped with a specialized elephant detection model.

The elephant detection model is trained using machine learning algorithms to recognize the distinctive features and movements of elephants. It analyzes the live video feed from the cameras in real-time, swiftly identifying the presence of elephants within the vicinity of the village.

## Alert Mechanism:

Upon detecting elephants, Nigrani triggers a series of immediate alerts to notify villagers and prevent potential conflicts. The system is equipped with sirens and bright flashing lights strategically installed throughout the village. Once the presence of an elephant is confirmed, the sirens blare loudly, and the lights flash, providing a clear and unmistakable warning signal.

## Community Engagement:

In addition to the automated alerts, Nigrani fosters community engagement by involving villagers in the monitoring process. The system is designed to notify local authorities and wildlife conservation organizations simultaneously, ensuring prompt response and assistance.

Moreover, awareness campaigns and educational programs are conducted to familiarize villagers with the importance of coexisting harmoniously with wildlife. Villagers are encouraged to report elephant sightings and provide feedback on the effectiveness of the Nigrani system, fostering a sense of ownership and cooperation within the community.

## Benefits of Nigrani:

1. **Enhanced Safety:** By promptly detecting and alerting villagers to the presence of elephants, Nigrani significantly reduces the risk of human-wildlife conflicts and potential injuries or fatalities.

2. **Minimized Crop Damage:** Timely alerts enable farmers to take preventive measures, such as reinforcing fences or deploying deterrents, thus minimizing crop damage caused by elephant incursions.

3. **Conservation Efforts:** By mitigating conflicts and promoting peaceful coexistence, Nigrani contributes to wildlife conservation efforts by reducing retaliatory killings of elephants and fostering positive attitudes towards conservation.

4. **Cost-Effective Solution:** Compared to traditional methods such as hiring human guards or erecting physical barriers, Nigrani offers a cost-effective and scalable solution that utilizes advanced technology for efficient monitoring and alerting.

In conclusion, Nigrani represents a groundbreaking approach to addressing human-wildlife conflicts in areas prone to elephant encounters. By harnessing the power of technology and community engagement, this innovative system not only safeguards villages but also promotes harmony between humans and elephants, ensuring a sustainable future for both.

## Things We'll be using:

1.  **Raspberry Pi 4**
    <br>
    <img src="https://th.bing.com/th/id/R.2a7ee301196df64807b43ab6332667ad?rik=LEjogk9z07bkCA&pid=ImgRaw&r=0" style="width: 300px; object-fit: cover;">

2.  **Siren**
    <br>
    <img src="https://static.wixstatic.com/media/360402_e68159ecae804f639da0c42f8043f180~mv2_d_1740_1305_s_2.jpg/v1/fit/w_1000,h_1000,al_c,q_80/file.png" style="width: 300px; object-fit: cover;">

3.  **LED Light**
    <br>
    <img src="https://cdn.britannica.com/54/154654-050-BBC4DE90/diodes.jpg" style="width: 300px; object-fit: cover;">

## To install and configure Nigrani, follow these steps:

### Prerequisites

- Node.js and npm (Node Package Manager) installed on your machine.
- Python and pip (Python Package Manager) installed on your machine.
- Git installed on your machine.
- Access to the nigrani GitHub repository.

### Installation Steps

1. **Clone the GitHub Repository**: Open your terminal and navigate to the directory where you want to install nigrani. Then, clone the GitHub repository using the following command:

   ```bash
   git clone https://github.com/ABChapagain/nigrani
   ```

2. **Navigate to the Project Directory**: Change your current directory to the cloned nigrani repository:

   ```bash
   cd nigrani
   ```

3. **Install npm Packages**: Run the following command to install the required Node.js packages using npm:

   ```bash
   npm install
   ```

4. **Install pip Packages**: nigrani may require certain Python packages. To install these packages, create a virtual environment (recommended) and activate it. Then, use pip to install the required packages:

   ```bash
   # Create a virtual environment (optional but recommended)
   python -m venv venv

   # Activate the virtual environment (Windows)
   venv\Scripts\activate

   # Activate the virtual environment (macOS/Linux)
   source venv/bin/activate

   # Install Python packages
   pip install -r requirements.txt
   ```

5. **Configuration**: nigrani may require configuration for your specific environment and CCTV camera setup. Refer to the project's documentation or configuration files to set up the system according to your needs.

6. **Build and Start the Server**: Once you have installed the npm packages and configured the system, you can build and start the server using the following command and run this command in a different terminal:

   ```bash
   python app.py
   python send.py
   npm run socket
   npm run dev
   ```

   This command will build the project and start the server.

## Usage

1. Access the Nigrani dashboard by opening `http://localhost:5173/` in your web browser.
2. Explore the different monitoring features and customize the settings according to your needs.

## Languages Used

## Languages Used

1. [![Reactjs]](https://www.reactjs.com/)
   <br>
   <img src="https://th.bing.com/th/id/OIP.33CwBYkmnMfpA9Djup22JwHaHa?rs=1&pid=ImgDetMain" style="height: 150px; object-fit: cover;">

2. [![Python]](https://www.python.org/)
   <br>
   <img src="https://img.shields.io/badge/-Python-black?style=flat-square&logo=python" style="height: 150px; object-fit: cover;">

3. [![MONGODB]](https://mongodb.org/)
   <br>
   <img src="https://secureservercdn.net/160.153.137.14/fad.0cb.myftpupload.com/wp-content/uploads/2021/03/MongoDB.jpg" style="height: 150px; object-fit: cover;">

4. [![NODE JS]](https://www.nodejs.com/)
   <br>
   <img src="https://th.bing.com/th/id/R.d42672d4d185739d26257ed5c653c740?rik=rEXYValDvbZk4Q&pid=ImgRaw&r=0&sres=1&sresct=1" style="height: 150px; object-fit: cover;">

5. [![YOLO v8]](https://www.nodejs.com/)
   <br>
   <img src="https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/sites/104576/images/60c0daf-336a-171-86b-3a2b5d63df6a_1673353327682.png" style="height: 150px; object-fit: cover;">

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project developed under **BPC Hackfest 2024**.

The project aims to provide a robust and efficient monitoring system. It leverages the latest technologies to ensure seamless surveillance and security.

## Contact

For any questions or inquiries, please contact the project maintainer at [mechigeeks@gmail.com](mailto:mechigeeks@gmail.com).
