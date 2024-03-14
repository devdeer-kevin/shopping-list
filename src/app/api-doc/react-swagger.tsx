'use client'

import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

type Props = {
    spec: Record<string, any>
}

function ReactSwagger({ spec }: Props) {
    return (
        <div className="bg-slate-100 min-h-screen p-8">
            <SwaggerUI spec={spec} />
        </div>
    )
}

export default ReactSwagger
