# Grocery-Inventory

This grocery inventory management system is built using Django REST framework for the backend API. Django is a powerful web framework in Python for building web applications quickly and with less code. The REST framework is an extension for Django that makes it easy to build APIs
and React for the frontend functionality, a popular JavaScript library for building user interfaces. React allows for efficient and interactive UI development, making it an excellent choice for creating dynamic web applications.




## Getting Started(Backend)

Follow these steps to set up and run the backend locally:
### Prerequisites
Make sure you have Python installed on your system. You can download and install Python from the official website: https://www.python.org/



1. **Clone the repository:**

     ```bash
     git clone https://github.com/ashwin275/Grocery-Inventory.git

 
4. **Navigate to the  Backend directory:**

   ```bash
   cd Backend

3. **Create a virtual environment and activate it:**
    
   ```bash
   python -m venv djvenv
   source djvenv/bin/activate   # On Windows: djvenv\Scripts\activate

4. **Install the dependencies:**

   ```bash
   pip install -r requirements.txt
5. **Navigate to the  Project directory:**

   ```bash
   cd project

6. **Apply Database Migrations:**
   Run the following command to apply the database migrations:
   ```bash
   
   python manage.py migrate

7. **Run the Development Server:**
 
    
     ```bash
   
   python manage.py runserver


8. **Access the backend API at** http://127.0.0.1:8000/.


## Getting Started(Frontend)

Follow these steps to set up and run the Frontend locally:
### Prerequisites
Make sure you have Node.js and npm (Node Package Manager) installed on your system. You can download and install them from the official Node.js website: https://nodejs.org/




1. **Navigate to the  Project directory:**

   ```bash
   cd Frontend/project

2. **Install Frontend Dependencies:**

   ```bash
   npm install

3. **Start the Development Server:**
 
    
     ```bash
   
   npm run dev

4. **This will build the frontend and open the development server at http://localhost:5173/.**
