FROM python:3.9

ENV PYTHONBUFFERED 1
ENV ACCEPT_EULA=Y

COPY requirements.txt .

RUN apt-get update \
   && apt-get -y install gcc \
   && apt-get -y install g++ \
   && apt-get -y install unixodbc unixodbc-dev \
   && apt-get clean \
   && curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
   && curl https://packages.microsoft.com/config/debian/10/prod.list > /etc/apt/sources.list.d/mssql-release.list \
   && apt-get update \
   && apt-get install -y --no-install-recommends --allow-unauthenticated msodbcsql17 mssql-tools \
   && echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bash_profile \
   && echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc \ 
   && pip install -r requirements.txt

COPY . .

CMD cd base && python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8000