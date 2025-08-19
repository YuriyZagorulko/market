FROM python:3

# Prevent .pyc files and enable unbuffered output
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Upgrade pip and install dependencies
RUN pip install --upgrade pip setuptools wheel debugpy

# Copy project requirements and install
COPY ./backend/requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt

# Copy all project files
COPY . /app

# Optional: initial data updates
RUN python ./backend/manage.py update_post_officess

# Default command for production (can be overridden in debug)
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "backend.wsgi:application"]
