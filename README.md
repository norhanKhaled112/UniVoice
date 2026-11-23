# UniVoice

UniVoice is a student complaint management system. Students submit complaints, the system routes them to the responsible department staff, and the student is notified when the complaint is resolved.

## Team

| Member | Role in the plan |
|---|---|
| Norhan Khaled | Requirements, Frontend |
| Malak Mohammed | UI/UX, Testing |
| Kholoud Rashed | Backend, Documentation |
| All Team | System analysis |

## 1. Context diagram (Level 0)

The system is shown as a single process (`0`) with two external entities.

![Context diagram](images/context-diagram.png)

| Data flow | From | To |
|---|---|---|
| Complaint Details | Student | UniVoice System |
| Notification & Resolution Status | UniVoice System | Student |
| Complaint for Review | UniVoice System | Department Staff |
| Resolution Details | Department Staff | UniVoice System |

## 2. Project schedule

| ID | Activity | Owner | Dependency | Duration (days) | Start | End |
|---|---|---|---|---|---|---|
| A | Requirement | Norhan Khaled | - | 7 | 28-Oct | 3-Nov |
| B | System analysis | All Team | A | 7 | 4-Nov | 10-Nov |
| C | UI/UX | Malak Mohammed | B | 8 | 11-Nov | 18-Nov |
| D | Frontend | Norhan Khaled | C | 17 | 19-Nov | 5-Dec |
| E | Backend | Kholoud Rashed | C | 20 | 19-Nov | 8-Dec |
| F | Testing | Malak Mohammed | D, E | 7 | 9-Dec | 15-Dec |
| G | Documentation | Kholoud Rashed | F | 5 | 16-Dec | 20-Dec |

Durations are calendar days counted inclusively (end - start + 1). All dependencies are finish-to-start.

### Gantt chart

![Gantt chart](images/gantt-chart.png)

## 3. Critical path method (CPM)

![CPM network diagram](images/cpm-network.png)

Each box reads: `ES | Duration | EF` on top, the activity in the middle, and `LS | Total float | LF` at the bottom.

| ID | ES | EF | LS | LF | Total float | Critical |
|---|---|---|---|---|---|---|
| A | 0 | 7 | 0 | 7 | 0 | Yes |
| B | 7 | 14 | 7 | 14 | 0 | Yes |
| C | 14 | 22 | 14 | 22 | 0 | Yes |
| D | 22 | 39 | 25 | 42 | 3 | No |
| E | 22 | 42 | 22 | 42 | 0 | Yes |
| F | 42 | 49 | 42 | 49 | 0 | Yes |
| G | 49 | 54 | 49 | 54 | 0 | Yes |

- **Critical path:** A → B → C → E → F → G
- **Project duration:** 54 days (28-Oct-2026 to 20-Dec-2026)
- **Float:** Frontend has 3 days of total float because Backend (20 days) is longer than Frontend (17 days). Any delay in a critical activity delays the whole project.

## Files

| File | Description |
|---|---|
| `images/` | Diagram images used in this README |
| `CPM_UniVoice.xlsx` | Excel sheet with the dependency column and CPM formulas |
| `UniVoice_CPM.drawio` | Editable CPM network diagram (open in [diagrams.net](https://app.diagrams.net)) |
| `UniVoice_Context_Diagram.drawio` | Editable context diagram |
