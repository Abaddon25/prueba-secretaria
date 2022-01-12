FROM python:3.9

ENV PYTHONBUFFERED 1
ENV ACCEPT_EULA=Y

COPY requirements.txt .

RUN apt-get update 
RUN apt-get -y install gcc 
RUN apt-get -y install g++ 
RUN apt-get -y install unixodbc unixodbc-dev 
RUN apt-get clean 
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - 
RUN curl https://packages.microsoft.com/config/debian/10/prod.list > /etc/apt/sources.list.d/mssql-release.list 
RUN apt-get update 
RUN apt-get install -y --no-install-recommends --allow-unauthenticated msodbcsql17 mssql-tools 
RUN echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bash_profile 
RUN echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc 
RUN pip install -r requirements.txt

COPY . .

CMD cd base && python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8000