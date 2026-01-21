# NITDCheck - AI-Powered Attendance Management System

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![Python Version](https://img.shields.io/badge/python-%3E%3D3.8-blue)](https://python.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue)](https://postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-6+-red)](https://redis.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-blue)](https://typescriptlang.org/)

NITDCheck is a comprehensive attendance management system designed for National Institute of Technology Delhi (NITD). It combines modern web technologies with AI-powered face recognition to provide seamless attendance tracking for both students and faculty.

## 🌟 Features

### For Students
- **Real-time Attendance Dashboard**: View attendance statistics across all subjects
- **Detailed Analytics**: Track attendance trends with interactive charts using Recharts
- **Schedule Integration**: View class timetables and schedules
- **Profile Management**: Secure authentication and profile access via NextAuth.js

### For Teachers
- **Automated Attendance**: Upload class photos for instant AI-powered face recognition
- **Manual Attendance Management**: Override or correct attendance records
- **Class Analytics**: Monitor attendance patterns and identify at-risk students
- **Multi-class Management**: Handle multiple courses and sections efficiently
- **Bulk Email Notifications**: Automated email alerts for absent students

### AI-Powered Automation
- **Face Recognition**: Advanced face detection using InsightFace with buffalo_l model
- **Efficient Search**: FAISS vector database for fast similarity matching
- **Batch Processing**: Handle large class photos with optimized performance
- **Scalable Dataset**: Support for multiple academic years and branches
- **Modular Python Architecture**: Separate workers for preprocessing, recognition, and logging

### System Features
- **Real-time Notifications**: Email alerts for attendance updates using Nodemailer
- **Background Processing**: Asynchronous job queues with BullMQ and Redis
- **Responsive Design**: Mobile-friendly web interfaces with Tailwind CSS
- **Type-Safe Development**: Full TypeScript implementation with strict mode
- **Monorepo Architecture**: Efficient code sharing with Turborepo
- **Horizontal Scaling**: Multiple worker instances for high-throughput processing

## 🏗️ System Architecture

NITDCheck uses a modern monorepo architecture built with Turborepo:

```
NITDCheck/
├── apps/
│   ├── student/          # Student portal (Next.js, port 3001)
│   │   ├── app/          # Next.js 15 App Router
│   │   ├── components/   # React components
│   │   ├── lib/          # Authentication & utilities
│   │   └── package.json  # Dependencies
│   ├── teacher/          # Teacher portal (Next.js, port 3000)
│   │   ├── app/          # Next.js 15 App Router
│   │   ├── components/   # React components
│   │   ├── lib/          # Business logic
│   │   └── package.json  # Dependencies
│   └── workers/          # Background services (Node.js + Python)
│       ├── index.ts      # Main BullMQ worker
│       ├── start-workers.js  # Multi-worker scaling script
│       └── attendance_automation_server/  # Python AI system
│           ├── main.py   # CLI entry point
│           ├── config.py # Configuration
│           ├── worker/   # Modular components
│           ├── dataset/  # Student photos
│           └── encodings/# Face embeddings
├── packages/
│   ├── database/         # Prisma ORM & PostgreSQL schema
│   │   ├── index.ts      # Prisma client
│   │   ├── prisma/       # Schema & migrations
│   │   └── package.json
│   ├── ui/              # Shared React components
│   │   ├── src/         # Component library
│   │   └── package.json
│   ├── queue/           # BullMQ + Redis utilities
│   │   ├── index.ts     # Queue client
│   │   └── package.json
│   ├── tailwind-config/ # Shared styling configuration
│   ├── eslint-config/   # Code quality rules
│   └── typescript-config/ # TypeScript configurations
```

## 🛠️ Technology Stack

### Frontend Layer
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5.8 with strict mode enabled
- **Styling**: Tailwind CSS 3.4 with custom design system
- **UI Components**: React 19 with custom component library
- **Charts**: Recharts for data visualization
- **Authentication**: NextAuth.js 4.24 with JWT tokens
- **State Management**: React hooks and server state

### Backend & Database Layer
- **Database**: PostgreSQL 15+ with connection pooling
- **ORM**: Prisma 5.x with type-safe queries
- **API**: Next.js API Routes with server-side rendering
- **Job Queue**: BullMQ with Redis 6+ for distributed processing
- **Email Service**: Nodemailer with Gmail SMTP
- **Background Jobs**: Custom Node.js workers with auto-scaling

### AI & Automation Layer
- **Face Recognition**: InsightFace with buffalo_l model (512D embeddings)
- **Vector Search**: FAISS for efficient similarity matching
- **Image Processing**: OpenCV and NumPy for computer vision
- **Python Framework**: Custom modular architecture
- **Model Storage**: Local FAISS indexes organized by year/branch
- **Batch Processing**: Optimized for multiple faces per image

### Infrastructure & DevOps
- **Monorepo**: Turborepo for efficient build orchestration
- **Code Quality**: ESLint 9 + Prettier for consistent formatting
- **Type Checking**: TypeScript with strict configuration
- **Package Manager**: npm workspaces with lockfile
- **Process Management**: Custom scaling scripts with graceful shutdown
- **Containerization**: Docker support for deployment

### Data Flow Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web Browser   │    │   Next.js API   │    │   BullMQ Queue  │
│                 │    │   Routes        │    │   (Redis)       │
│ Student Portal  │───▶│ Teacher Portal  │───▶│                 │
│ (Port 3001)     │    │ (Port 3000)     │    │ Job Processing  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                       │
                                                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Worker Pool    │    │   Python AI     │    │   PostgreSQL    │
│  (Node.js)      │───▶│   System        │───▶│   Database      │
│                 │    │   (InsightFace) │    │   (Prisma)      │
│ Auto-scaling    │    │   (FAISS)       │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                       │
                                                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Email         │    │   Attendance    │    │   Analytics     │
│   Notifications │    │   Records       │    │   Dashboard     │
│   (Nodemailer)  │    │   (JSON logs)   │    │   (Recharts)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **Python** >= 3.8
- **PostgreSQL** >= 15
- **Redis** >= 6
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd NITDCheck
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create `.env` files in the root directory:

   ```bash
   # Database & Redis
   DATABASE_URL="postgresql://username:password@localhost:5432/nitdcheck"
   REDIS_URL="redis://localhost:6379"

   # Authentication
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"

   # Email Service
   EMAIL_USER="your-email@gmail.com"
   EMAIL_PASS="your-app-password"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client and run migrations
   npx prisma generate
   npx prisma db push

   # Optional: Seed with sample data
   npx prisma db seed
   ```

5. **Set up Python environment**
   ```bash
   cd apps/workers/attendance_automation_server
   pip install -r requirements.txt
   ```

### Development

Start all services in development mode:

```bash
# Start all apps and packages
npm run dev

# Or start specific services
npm run dev -- --filter=student    # Student portal only (port 3001)
npm run dev -- --filter=teacher    # Teacher portal only (port 3000)
npm run dev --filter=workers       # Background workers only
```

Access the applications:
- **Teacher Portal**: http://localhost:3000
- **Student Portal**: http://localhost:3001

### Scaling Workers

The system supports horizontal scaling of background workers through a custom Node.js script:

#### Single Worker (Development)
```bash
cd apps/workers
npm run dev  # Runs index.ts with tsx watch
```

#### Multiple Workers (Production Scaling)
```bash
cd apps/workers

# Start 3 workers (default)
npm run workers

# Start custom number of workers
NUM_WORKERS=5 node start-workers.js

# Manual scaling
node start-workers.js  # Uses NUM_WORKERS env var
```

#### Scaling Architecture

The `start-workers.js` script provides:
- **Process Spawning**: Creates multiple Node.js processes
- **Load Distribution**: Redis automatically distributes jobs
- **Auto-restart**: Failed workers restart after 5 seconds
- **Graceful Shutdown**: Ctrl+C stops all workers cleanly
- **Centralized Logging**: All worker logs prefixed with worker ID

**Scaling Formula:**
- 1 worker = 4 concurrent jobs
- 3 workers = 12 concurrent jobs
- N workers = 4×N concurrent jobs

### Building for Production

```bash
# Build all apps
npm run build

# Build specific app
npx turbo build --filter=workers

# Start production servers
npm run start
```

## 📊 Database Schema

The system uses a comprehensive PostgreSQL database schema:

### Core Entities
- **Students**: Enrollment details, department, course, semester information
- **Teachers**: Faculty profiles and course assignments
- **Courses**: Subject metadata and course information
- **Teaches**: Junction table linking teachers to courses with semester/department context

### Attendance System
- **Timetable**: Class schedules with room assignments and time slots
- **Absentees**: Daily attendance records with student-course-date relationships
- **Nonworkingdays**: Holiday and special event calendar

### Key Relationships
- Students enroll in courses through teaches relationships
- Teachers manage multiple courses across semesters
- Attendance is tracked per student per course per date
- Timetables define class schedules for automated attendance

## 🤖 AI Attendance System

The face recognition system consists of several integrated components:

### Dataset Management
- **Hierarchical Organization**: Student photos organized by academic year → branch → individual
- **Preprocessing Pipeline**: Face detection and embedding extraction using InsightFace
- **Index Management**: FAISS vector indexes for efficient similarity search
- **Model Persistence**: Separate indexes for different year/branch combinations

### Recognition Pipeline
1. **Image Upload**: Teachers upload class photos via web interface
2. **Job Queuing**: Images queued using BullMQ with Redis backend
3. **Face Detection**: InsightFace identifies all faces in the photo
4. **Feature Extraction**: Generate 512D embeddings for each detected face
5. **Similarity Search**: FAISS index lookup with configurable thresholds
6. **Attendance Logging**: Mark present/absent students with timestamps
7. **Email Notifications**: Automated alerts to absent students

### Python Architecture
```
attendance_automation_server/
├── main.py              # Entry point with CLI interface
├── config.py            # Configuration management
├── worker/              # Modular processing components
│   ├── preprocessing_worker.py    # Face detection & embedding
│   ├── dataset_worker.py          # Index building & management
│   ├── recognizer_worker.py       # Similarity matching
│   └── json_worker.py             # Attendance logging
├── dataset/             # Student photo collections
├── encodings/           # Generated face embeddings
└── attendance_logs/     # JSON attendance records
```

### Performance Features
- **Batch Processing**: Handle multiple faces per image efficiently
- **Confidence Thresholding**: Configurable similarity thresholds (default: 0.6)
- **Memory Optimization**: Streaming processing for large images
- **Error Handling**: Robust failure recovery and logging
- **Scalability**: Horizontal scaling with multiple worker instances

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Yes | - |
| `REDIS_URL` | Redis server URL | Yes | `redis://localhost:6379` |
| `NEXTAUTH_SECRET` | JWT signing secret | Yes | - |
| `NEXTAUTH_URL` | Base URL for auth | Yes | `http://localhost:3000` |
| `EMAIL_USER` | Gmail sender address | No | - |
| `EMAIL_PASS` | Gmail app password | No | - |
| `NUM_WORKERS` | Number of worker instances | No | `3` |

### Python Configuration (`config.py`)

```python
# Face recognition settings
FACE_ANALYSIS_MODEL = "buffalo_l"  # InsightFace model
SIMILARITY_THRESHOLD = 0.6         # Matching confidence
BATCH_SIZE = 32                    # Processing batch size

# Directory paths
DATASET_DIR = "dataset"
MODEL_DIR = "models"
ATTENDANCE_LOGS_DIR = "attendance_logs"
IMAGES_DIR = "images"
```

### Worker Scaling Configuration

```javascript
// In start-workers.js
const NUM_WORKERS = process.env.NUM_WORKERS || 3;  // Scale as needed
const RESTART_DELAY = 5000;  // Auto-restart delay in ms
```

## 📈 API Endpoints

### Student Portal APIs
- `GET /api/auth/session` - Get current user session
- `GET /api/attendance` - Fetch attendance records for student
- `GET /api/schedule` - Get class timetable
- `GET /api/profile` - Get student profile information

### Teacher Portal APIs
- `POST /api/auth/session` - Teacher authentication
- `POST /api/upload` - Upload class photos for processing
- `GET /api/classes` - Get assigned classes and statistics
- `PUT /api/attendance` - Manual attendance corrections
- `GET /api/analytics` - Class attendance analytics

### Background Worker APIs
- `POST /api/queue/process-image` - Queue image for AI processing
- `GET /api/workers/status` - Get worker health and statistics

## 🧪 Testing

```bash
# Run all tests across monorepo
npm run check-types  # Type checking
npm run lint         # Code quality

# Test specific apps
npx turbo test --filter=student
npx turbo test --filter=teacher

# Build verification
npm run build
```

## 🚀 Deployment

### Docker Deployment (Recommended)

```bash
# Build all services
docker-compose build

# Start production stack
docker-compose up -d

# Scale workers
docker-compose up -d --scale workers=5
```

### Manual Deployment

1. **Build applications**
   ```bash
   npm run build
   npx turbo build --filter=workers
   ```

2. **Database setup**
   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```

3. **Start services**
   ```bash
   # Web applications
   npm run start

   # Workers with scaling
   cd apps/workers
   NUM_WORKERS=5 node start-workers.js
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make changes with proper TypeScript types
4. Test across all apps: `npm run check-types`
5. Commit with conventional format: `git commit -m "feat: add new feature"`
6. Push and create pull request

### Development Guidelines

- **TypeScript**: Strict mode enabled, full type coverage required
- **Code Style**: ESLint + Prettier with automatic formatting
- **Testing**: Write tests for new features and API endpoints
- **Documentation**: Update README and inline comments for changes
- **Commits**: Use conventional commits for automated versioning

### Scaling Guidelines

- **Workers**: Start with 3 instances, scale based on queue depth
- **Database**: Monitor connection pools, use Prisma's built-in pooling
- **Redis**: Ensure sufficient memory for queue persistence
- **Python**: Monitor memory usage with multiple FAISS indexes

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **InsightFace** - Advanced face recognition and analysis
- **FAISS** - Efficient similarity search and vector indexing
- **Next.js** - React framework with excellent developer experience
- **Prisma** - Type-safe database access and migrations
- **BullMQ** - Reliable job queues with Redis backend
- **Turborepo** - High-performance monorepo build system
- **Redis** - High-performance data structure store for queuing

## 📞 Support

For support and questions:
- Create an issue on GitHub with detailed information
- Check existing documentation and troubleshooting guides
- Contact the NITD development team for institutional support

---

**Built with ❤️ for National Institute of Technology Delhi**

*Empowering education through technology and AI-driven automation*