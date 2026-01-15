FROM python:3.12-slim

# Python のバッファ無効化（ログ即時出力）
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# OS 依存ライブラリ
RUN apt-get update && apt-get install -y \
    build-essential \
    default-libmysqlclient-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Python 依存関係
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Django プロジェクト本体
COPY mysite ./mysite

# gunicorn が使うポート
EXPOSE 8000

# Django プロジェクト本体
COPY mysite ./mysite

# サービス起動コマンド
CMD ["gunicorn", "--chdir", "mysite", "mysite.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "4", "--threads", "2"]
