#!/bin/bash
# PWA Lighthouse Audit Script
# Run this to verify PWA capabilities meet requirements

echo "=========================================="
echo "PWA Lighthouse Audit"
echo "=========================================="
echo ""

# Check if lighthouse is installed
if ! command -v lighthouse &> /dev/null; then
    echo "Installing Lighthouse CLI..."
    npm install -g lighthouse
fi

echo "Starting development server..."
npm run dev &
DEV_PID=$!

# Wait for server to start
sleep 5

echo ""
echo "Running Lighthouse PWA audit..."
echo "Target: http://localhost:3000/dashboard"
echo ""

lighthouse http://localhost:3000/dashboard \
    --only-categories=pwa \
    --output=json \
    --output-path=lighthouse-pwa-report.json \
    --quiet

echo ""
echo "=========================================="
echo "PWA Audit Results"
echo "=========================================="

# Parse and display results
if [ -f "lighthouse-pwa-report.json" ]; then
    # Extract PWA score
    PWA_SCORE=$(cat lighthouse-pwa-report.json | grep -o '"score":[0-9.]*' | head -1 | grep -o '[0-9.]*')
    
    echo "PWA Score: ${PWA_SCORE:-N/A}%"
    
    # Check individual audits
    echo ""
    echo "Individual PWA Audits:"
    echo "----------------------"
    
    # Service Worker
    SW=$(cat lighthouse-pwa-report.json | grep -o '"service-worker"[^}]*' | grep -o '"score":true' | head -1)
    if [ -n "$SW" ]; then
        echo "✓ Service Worker: PASSED"
    else
        echo "✗ Service Worker: NEEDS REVIEW"
    fi
    
    # Manifest
    MANIFEST=$(cat lighthouse-pwa-report.json | grep -o '"webapp-installable-manifest"[^}]*' | grep -o '"score":true' | head -1)
    if [ -n "$MANIFEST" ]; then
        echo "✓ Web App Manifest: PASSED"
    else
        echo "✗ Web App Manifest: NEEDS REVIEW"
    fi
    
    # Splash Screen
    SPLASH=$(cat lighthouse-pwa-report.json | grep -o '"splash-screen"[^}]*' | grep -o '"score":true' | head -1)
    if [ -n "$SPLASH" ]; then
        echo "✓ Splash Screen: PASSED"
    else
        echo "✗ Splash Screen: NEEDS REVIEW"
    fi
    
    # Installable
    INSTALLABLE=$(cat lighthouse-pwa-report.json | grep -o '"installable-manifest"[^}]*' | grep -o '"score":true' | head -1)
    if [ -n "$INSTALLABLE" ]; then
        echo "✓ Installable: PASSED"
    else
        echo "✗ Installable: NEEDS REVIEW"
    fi
    
    # Offline
    OFFLINE=$(cat lighthouse-pwa-report.json | grep -o '"works-offline"[^}]*' | grep -o '"score":true' | head -1)
    if [ -n "$OFFLINE" ]; then
        echo "✓ Works Offline: PASSED"
    else
        echo "✗ Works Offline: NEEDS REVIEW"
    fi
    
    echo ""
    if [ "${PWA_SCORE:-0}" -ge 90 ]; then
        echo "✓ PWA Score meets requirement (>= 90): PASSED"
    else
        echo "✗ PWA Score does not meet requirement (>= 90): NEEDS IMPROVEMENT"
    fi
else
    echo "Error: Lighthouse report not generated"
fi

# Cleanup
kill $DEV_PID 2>/dev/null

echo ""
echo "Full report saved to: lighthouse-pwa-report.json"
echo "=========================================="